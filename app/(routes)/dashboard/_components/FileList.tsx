import { FileListContext } from '@/app/_context/FileListContext'
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import Image from 'next/image';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Archive, MoreHorizontal } from 'lucide-react';
export interface FILE{
    archive:boolean,
    createdBy:string,
    document:string,
    fileName:string,
    teamId:string,
    whiteboard:string,
    _id:string,
    _creationTime:number
}
function FileList() {
    const {fileList_,setFileList_} = useContext(FileListContext);
    const [fileList,setFileList] = useState<any>();
    const {user}:any = useKindeBrowserClient();
    const router = useRouter();
    useEffect(()=>{
        fileList_&&setFileList(fileList_);
        console.log(fileList_);
    },[fileList_])
  return (
    <div className='mt-10'>
    

<div className="overflow-x-auto">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</td>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Edited</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
        {fileList&&fileList.map((file:FILE,index:number)=>(
             <tr key={index} className="odd:bg-gray-50 cursor-pointer"
             onClick={()=>router.push('/workspace/'+file._id)}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format('DD MM YYYY')}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format('DD MM YYYY')}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
            {user && <Image src={user?.picture} alt='user' width={30} height={30} className='rounded-full'/>}
        </td>
         <td className="whitespace-nowrap px-4 py-2 text-gray-700">
         
          <DropdownMenu>
  <DropdownMenuTrigger>
  <MoreHorizontal/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
   
    <DropdownMenuItem className='gap-3'>
       <Archive className='h-4 w-4'/> Archive</DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu>

        </td>
      </tr>
        ))}
     

      

      
    </tbody>
  </table>
</div>
    </div>
  )
}

export default FileList