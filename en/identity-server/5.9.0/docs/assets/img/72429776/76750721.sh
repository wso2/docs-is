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

USERCUSTOMIZEDDIR=$1

svnStat=$(svn status ${USERCUSTOMIZEDDIR} 2>&1)

if [[ ${svnStat} != *"not a working copy"* ]]; then
    echo
    echo
    printNotice "Customized deployment directory is part of a Subversion working copy."
else
    printError "Customized deployment directory is not part of a Subversion working copy."
    exit 1
fi

read -p "Do you want to commit the updated artifacts to SVN (y/N)? " answer
[ -z "$answer" ] && answer="No"

case ${answer:0:1} in
    y|Y )
        printInfo "Committing updated artifacts to SVN..."
        svnrmOutput=($(svn rm -- $(svn status ${USERCUSTOMIZEDDIR} | sed -e '/^!/!d' -e 's/^!//')))
        svn commit -m "Update deployment artifacts" ${USERCUSTOMIZEDDIR}
        printInfo "Successfully committed the updated artifacts to svn."
    ;;
    * )
        exit 1
    ;;
esac