#!/usr/bin/env bash

#LASTWUMUPDATEDDIR=PreviousDeployment/
#CURRENTWUMUPDATEDDIR=WUMUpdatedDeployment/
#USERCUSTOMIZEDDIR=CustomizedDeployment/

read -p 'Last WUM updated deployment directory: ' LASTWUMUPDATEDDIR
read -p 'Current WUM updated deployment directory: ' CURRENTWUMUPDATEDDIR
read -p 'Customized deployment directory: ' USERCUSTOMIZEDDIR

LASTWUMUPDATEDDIR=${LASTWUMUPDATEDDIR%/}
CURRENTWUMUPDATEDDIR=${CURRENTWUMUPDATEDDIR%/}
USERCUSTOMIZEDDIR=${USERCUSTOMIZEDDIR%/}

#Validate the inputs
if [ -z "$LASTWUMUPDATEDDIR" ] || [ -z "$CURRENTWUMUPDATEDDIR" ] || [ -z "$USERCUSTOMIZEDDIR" ] || [ ! -d "$LASTWUMUPDATEDDIR" ] || [ ! -d "$CURRENTWUMUPDATEDDIR" ] || [ ! -d "$USERCUSTOMIZEDDIR" ]
  then
    echo "Directory paths are incorrect. Please re-run the script with valid directory paths."
    exit 1
fi

#To check whether all the directories are on same level
rootDirList1=$(ls ${LASTWUMUPDATEDDIR})
rootDirList2=$(ls ${CURRENTWUMUPDATEDDIR})
rootDirList3=$(ls ${USERCUSTOMIZEDDIR})

if [ "${rootDirList1}" != "${rootDirList2}" ] || [ "${rootDirList2}" != "${rootDirList3}" ]
  then
    echo
    echo "All the directory paths should be in the same directory level. Please re-run the script with valid directory paths."
    exit 1
fi

#Create new directory to keep updated customized contents
CUSTOMIZEDDIR=${USERCUSTOMIZEDDIR}"-WUMUpdated"

echo
if [ -d "$CUSTOMIZEDDIR" ]; then
    echo "Deleting already existing updated directory..."
    rm -r ${CUSTOMIZEDDIR}
fi

echo
echo "Creating the updated directory from the customized directory..."
cp -r ${USERCUSTOMIZEDDIR} ${CUSTOMIZEDDIR}

IFS=$'\n'
lastWUMUpdatedDirFiles=($(find ${LASTWUMUPDATEDDIR} -type f | grep -o -P "(?<=${LASTWUMUPDATEDDIR}).*"))
currentWUMUpdatedDirFiles=($(find ${CURRENTWUMUPDATEDDIR} -type f | grep -o -P "(?<=${CURRENTWUMUPDATEDDIR}).*"))

#Analyzing the updated and deleted files
echo "Processing the files in WUM update......"
for file in "${lastWUMUpdatedDirFiles[@]}"
do
    targetFile=${CURRENTWUMUPDATEDDIR}${file}

    if [ ! -f ${targetFile} ]; then
       echo "Deleted file: $targetFile"
       deletedFiles+=(${file})
    else
       previousmd5sum=$(md5sum "${LASTWUMUPDATEDDIR}$file" | cut -d ' ' -f 1)
       currentmd5sum=$(md5sum "$targetFile" | cut -d ' ' -f 1)

       if [ "$previousmd5sum" != "$currentmd5sum" ] ; then
           echo "Updated file: $file"
           changedFiles+=(${file})
       fi
    fi
done

#Analyzing the added files
for file in "${currentWUMUpdatedDirFiles[@]}"
do
    targetFile=${LASTWUMUPDATEDDIR}${file}

    if [ ! -f ${targetFile} ]; then
       declare -A addedFiles
       relativeDirectoryPath="$(dirname "$file")"
       addedFiles[$file]=${relativeDirectoryPath}
       echo "Added file: $targetFile"
    fi
done

echo
echo "Copying Files...."
#Copy the added files from the customized directory
for relativeFilePath in ${!addedFiles[@]}
do
   absoluteFilePath=${CURRENTWUMUPDATEDDIR}${relativeFilePath}
   targetPath=${CUSTOMIZEDDIR}${addedFiles[$relativeFilePath]}/

   echo "Copying ${CUSTOMIZEDDIR}${relativeFilePath}"

   mkdir -p ${targetPath}

   if [[ -d ${absoluteFilePath} ]]; then
        cp -r ${absoluteFilePath} ${targetPath}
   elif [[ -f ${absoluteFilePath} ]]; then
        cp ${absoluteFilePath} ${targetPath}
   else
        echo "$absoluteFilePath is not valid"
   fi
done

echo
echo "Deleting Files...."
#Delete the deleted files from the customized directory
for file in "${deletedFiles[@]}"
do
   absoluteFilePath=${LASTWUMUPDATEDDIR}/${file}
   targetPath=${CUSTOMIZEDDIR}/${file}

   echo "Deleting ${targetPath}"

   if [[ -d ${absoluteFilePath} ]]; then
        rm -r ${targetPath}
   elif [[ -f ${absoluteFilePath} ]]; then
        rm ${targetPath}
   else
        echo "$absoluteFilePath is not valid"
   fi
done

echo
echo "Updating the existing files...."

rm -r /tmp/patchdir
mkdir -p /tmp/patchdir
#Update the updated files
for file in "${changedFiles[@]}"
do
   originalFilePath=${LASTWUMUPDATEDDIR}${file}
   updatedFilePath=${CURRENTWUMUPDATEDDIR}${file}
   customizedFilePath=${CUSTOMIZEDDIR}${file}

   echo "Updating ${customizedFilePath}"

   patchFilePath=$(mktemp --suffix ".patch" -p /tmp/patchdir)

   #Get a diff between updated files
   diff -c1 ${originalFilePath} ${updatedFilePath} > $patchFilePath

   #Check for binary files - For binary files directly copy the content, for others apply the diff
   if grep -Fq "Binary files" ${patchFilePath}
   then
        echo -e "Binary file detected. Replacing the file with the updated file."
        mv ${customizedFilePath} ${customizedFilePath}.orig
        cp ${updatedFilePath} ${customizedFilePath}
        echo -e "Replaced the file. Backup file location ${customizedFilePath}.orig\nReview and delete the backup file."
   else
        patchOutput=$(patch --reject-format=unified ${customizedFilePath} -i ${patchFilePath} -r ${customizedFilePath}.diff)

        #Analyze patch output
        case "$patchOutput" in
            *"FAILED"*)
               >&2 echo -e "Error: $customizedFilePath : Failed. \nRefer the ${customizedFilePath}.diff file for the failure diff.\nResolve the conflicts and apply the diff manually.\nBackup file location ${customizedFilePath}.orig"
               ;;
            *"fuzz"*)
               echo -e "Warning: $customizedFilePath : Succeeded with Fuzz.\nBackup file location ${customizedFilePath}.orig\nReview the file before applying to the product."
               ;;
            *)
               echo "Successfully updated the file : $customizedFilePath"
               ;;
        esac
   fi
   echo
done

#Create the diff for all the files
diff -r -u ${LASTWUMUPDATEDDIR} ${CURRENTWUMUPDATEDDIR} > ${CUSTOMIZEDDIR}/Summary.diff

echo "Successfully applied the changes."
echo "Updated customized directory can be found at the location: $(readlink -f ${CUSTOMIZEDDIR})"
echo "Diff for all the updated files can be found at the location: $(readlink -f ${CUSTOMIZEDDIR}/Summary.diff)"
