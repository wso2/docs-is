#!/usr/bin/env bash

function printInfo {
    tput setaf 2; echo -e "[INFO] "$1
}

function printWarning {
    tput setaf 3; echo -e "[WARNING] "$1
}

function printError {
    tput setaf 1; echo -e "[ERROR] "$1
}

function printNotice {
    tput sgr0; echo -e "[NOTICE] "$1
}

#CURRENTWUMUPDATEDDIR=PreviousDeployment/
#LATESTWUMUPDATEDDIR=WUMUpdatedDeployment/
#USERCUSTOMIZEDDIR=CustomizedDeployment/

read -p 'Current WUM updated deployment directory: ' CURRENTWUMUPDATEDDIR
read -p 'Latest WUM updated deployment directory: ' LATESTWUMUPDATEDDIR
read -p 'Customized deployment directory: ' USERCUSTOMIZEDDIR

CURRENTWUMUPDATEDDIR=${CURRENTWUMUPDATEDDIR%/}
LATESTWUMUPDATEDDIR=${LATESTWUMUPDATEDDIR%/}
USERCUSTOMIZEDDIR=${USERCUSTOMIZEDDIR%/}

#Validate the inputs
if [ -z "$CURRENTWUMUPDATEDDIR" ] || [ -z "$LATESTWUMUPDATEDDIR" ] || [ -z "$USERCUSTOMIZEDDIR" ] || [ ! -d "$CURRENTWUMUPDATEDDIR" ] || [ ! -d "$LATESTWUMUPDATEDDIR" ] || [ ! -d "$USERCUSTOMIZEDDIR" ]
  then
    printError "Directory paths are incorrect. Please re-run the script with valid directory paths."
    exit 1
fi

#To check whether all the directo
# ries are on same level
rootDirList1=$(ls ${CURRENTWUMUPDATEDDIR})
rootDirList2=$(ls ${LATESTWUMUPDATEDDIR})
rootDirList3=$(ls ${USERCUSTOMIZEDDIR})

if [ "${rootDirList1}" != "${rootDirList2}" ]
  then
    echo
    printError "All the directory paths should be in the same directory level. Please re-run the script with valid directory paths."
    exit 1
fi

#Create new directory to keep updated customized contents
CUSTOMIZEDDIR=${USERCUSTOMIZEDDIR}"-WUMUpdated"

echo
if [ -d "$CUSTOMIZEDDIR" ]; then
    printInfo "Deleting already existing updated directory..."
    rm -r ${CUSTOMIZEDDIR}
fi

echo
printInfo "Creating the updated directory from the customized directory..."
echo
cp -r ${USERCUSTOMIZEDDIR} ${CUSTOMIZEDDIR}

old_IFS=$IFS
IFS=$'\n'
currentWUMUpdatedDirFiles=($(find ${CURRENTWUMUPDATEDDIR} -type f | grep -o -P "(?<=${CURRENTWUMUPDATEDDIR}).*"))
latestWUMUpdatedDirFiles=($(find ${LATESTWUMUPDATEDDIR} -type f | grep -o -P "(?<=${LATESTWUMUPDATEDDIR}).*"))

#Analyzing the updated and deleted files
printInfo "Processing the files in WUM update..."
for file in "${currentWUMUpdatedDirFiles[@]}"
do
    targetFile=${LATESTWUMUPDATEDDIR}${file}

    if [ ! -f ${targetFile} ]; then
       printNotice "Deleted file: $targetFile"
       deletedFiles+=(${file})
    else
       previousmd5sum=$(md5sum "${CURRENTWUMUPDATEDDIR}$file" | cut -d ' ' -f 1)
       currentmd5sum=$(md5sum "$targetFile" | cut -d ' ' -f 1)

       if [ "$previousmd5sum" != "$currentmd5sum" ] ; then
           printNotice "Updated file: $file"
           changedFiles+=(${file})
       fi
    fi
done

#Analyzing the added files
for file in "${latestWUMUpdatedDirFiles[@]}"
do
    targetFile=${CURRENTWUMUPDATEDDIR}${file}

    if [ ! -f ${targetFile} ]; then
       declare -A addedFiles
       relativeDirectoryPath="$(dirname "$file")"
       addedFiles[$file]=${relativeDirectoryPath}
       printNotice "Added file: $targetFile"
    fi
done

echo
printInfo "Copying Files..."
#Copy the added files from the customized directory
for relativeFilePath in ${!addedFiles[@]}
do
   absoluteFilePath=${LATESTWUMUPDATEDDIR}${relativeFilePath}
   targetPath=${CUSTOMIZEDDIR}${addedFiles[$relativeFilePath]}/

   printInfo "Copying ${CUSTOMIZEDDIR}${relativeFilePath}"

   mkdir -p ${targetPath}

   if [[ -d ${absoluteFilePath} ]]; then
        cp -r ${absoluteFilePath} ${targetPath}
   elif [[ -f ${absoluteFilePath} ]]; then
        cp ${absoluteFilePath} ${targetPath}
   else
        printError "$absoluteFilePath is not valid"
   fi
done

echo
printInfo "Deleting Files..."
#Delete the deleted files from the customized directory
for file in "${deletedFiles[@]}"
do
   absoluteFilePath=${CURRENTWUMUPDATEDDIR}/${file}
   targetPath=${CUSTOMIZEDDIR}/${file}

   printInfo "Deleting ${targetPath}"

   if [[ -d ${absoluteFilePath} ]]; then
        rm -r ${targetPath}
   elif [[ -f ${absoluteFilePath} ]]; then
        rm ${targetPath}
   else
        printError "$absoluteFilePath is not valid"
   fi
done

echo
printInfo "Updating the existing files..."


if [ -d /tmp/patchdir ]; then
    rm -r /tmp/patchdir
fi

mkdir -p /tmp/patchdir
#Update the updated files
patchStatusFailed=false
patchStatusWarning=false
for file in "${changedFiles[@]}"
do
   originalFilePath=${CURRENTWUMUPDATEDDIR}${file}
   updatedFilePath=${LATESTWUMUPDATEDDIR}${file}
   customizedFilePath=${CUSTOMIZEDDIR}${file}

   printNotice "Updating ${customizedFilePath}"

   patchFilePath=$(mktemp --suffix ".patch" -p /tmp/patchdir)

   #Get a diff between updated files
   diff -c1 ${originalFilePath} ${updatedFilePath} > $patchFilePath

   #Check for binary files - For binary files directly copy the content, for others apply the diff
   if grep -Fq "Binary files" ${patchFilePath}
   then
        if [[ ${file} == *".war"* ]]; then
            printInfo ".war file detected."
            read -p "Do you want to update the existing ${file} file with the updated one (Y/n)? " answer
            [ -z "$answer" ] && answer="Y"

            case ${answer:0:1} in
                y|Y )
                    printInfo "Updating the .war file."
                    cp ${updatedFilePath} ${customizedFilePath}
                    dirPath="${file%.*}"
                    webappDir=${CUSTOMIZEDDIR}/${dirPath}
                    if [ -d "$webappDir" ]; then
                        printNotice "Deleting the extracted directory to apply the changes."
                        rm -r ${webappDir}
                    fi
                ;;
                * )
                    printInfo "Keeping the original .war file."
                ;;
            esac
        else
            printNotice "Binary file detected. Replacing the file with the updated file."
            cp ${updatedFilePath} ${customizedFilePath}
        fi
        echo
   else
        patchOutput=$(patch --reject-format=unified --no-backup-if-mismatch ${customizedFilePath} -i ${patchFilePath} -r ${customizedFilePath}.diff)

        #Analyze patch output
        case "$patchOutput" in
            *"FAILED"*)
               printError "$customizedFilePath : Failed. \nRefer the ${customizedFilePath}.diff file for the failure diff.\nResolve the conflicts and apply the diff manually."
               echo
               patchStatusFailed=true
               ;;
            *"fuzz"*)
               printWarning "$customizedFilePath : Succeeded with Fuzz.\nReview the file before applying to the product."
               echo
               patchStatusWarning=true
               ;;
            *"offset"*)
               printWarning "$customizedFilePath : Succeeded with offset.\nReview the file before applying to the product."
               echo
               patchStatusWarning=true
               ;;
            *)
#               echo "Successfully updated the file : $customizedFilePath"
               ;;
        esac
   fi
done

#Create the diff for all the files
diff -r -u ${CURRENTWUMUPDATEDDIR} ${LATESTWUMUPDATEDDIR} > Summary.diff

if [[ ${patchStatusFailed} == true ]]; then
    printInfo "Updated customized directory can be found at the location: $(readlink -f ${CUSTOMIZEDDIR})"
    printInfo "Diff for all the updated files can be found at the location: $(readlink -f Summary.diff)"
    printError "There are files with conflicts. Resolve the conflicts and replace the updated directory with the existing directory."
    exit 1
fi

#Replacing the existing directory with the updated directory
rm -r ${USERCUSTOMIZEDDIR}
mv ${CUSTOMIZEDDIR} ${USERCUSTOMIZEDDIR}

printInfo "Updated customized directory can be found at the location: $(readlink -f ${USERCUSTOMIZEDDIR})"
printInfo "Diff for all the updated files can be found at the location: $(readlink -f Summary.diff)"

printInfo "Successfully applied the changes."

echo

if [[ ${patchStatusWarning} == true ]]; then
    printWarning "There are files with Warnings."
fi

read -p "Do you want to deploy the updated artifacts (y/N)? " answer
[ -z "$answer" ] && answer="No"

case ${answer:0:1} in
    y|Y )
        read -p "Deploy script path: " deployScript

        if [[ -f ${deployScript} ]]; then
            deployScriptPath=$(readlink -f ${deployScript})
            ${deployScriptPath} ${USERCUSTOMIZEDDIR}
        fi
    ;;
    * )
        exit 1
    ;;
esac

#svnStat=$(svn status ${USERCUSTOMIZEDDIR} 2>&1)
#
#if [[ ${svnStat} != *"not a working copy"* ]]; then
#    echo
#    echo
#    printNotice "Customized deployment directory is part of a Subversion working copy."
#else
#    exit 1
#fi
#
#read -p "Do you want to commit the updated artifacts to SVN (y/N)? " answer
#[ -z "$answer" ] && answer="No"
#
#IFS=$old_IFS
#
#case ${answer:0:1} in
#    y|Y )
#        printInfo "Committing updated artifacts to SVN..."
#        svnrmOutput=($(svn rm -- $(svn status ${USERCUSTOMIZEDDIR} | sed -e '/^!/!d' -e 's/^!//')))
#        svn commit -m "Update deployment artifacts" ${USERCUSTOMIZEDDIR}
#    ;;
#    * )
#        exit 1
#    ;;
#esac
