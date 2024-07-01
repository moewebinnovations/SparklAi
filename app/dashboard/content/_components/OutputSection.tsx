import React, { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy, Download, Check, Lock } from 'lucide-react';

interface Props {
  aiOutput: string;
  isSubscribed: boolean; // Add the isSubscribed prop
}

function OutputSection({ aiOutput, isSubscribed }: Props) {
  const editorRef: any = useRef();
  const [copyStatus, setCopyStatus] = useState(false);

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  }, [aiOutput]);

  const handleDownload = () => {
    if (!isSubscribed) return; // Prevent download if not subscribed

    const element = document.createElement('a');
    const file = new Blob([aiOutput], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'ai_output.txt';
    document.body.appendChild(element);
    element.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(aiOutput).then(() => {
      setCopyStatus(true);
      setTimeout(() => {
        setCopyStatus(false);
      }, 2000);
    });
  };

  return (
    <div className='relative'>
      <div className='absolute top-0 left-0 right-0 bg-white shadow-lg border rounded-t-lg p-3 md:p-5 mb-5 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0'>
        <h2 className='font-medium text-lg'>Your Results</h2>
        <div className='flex gap-2'>
          <Button className='flex gap-2 bg-gradient-to-r from-purple-500 to-indigo-500' onClick={handleCopy}>
            {copyStatus ? <Check className='w-4 h-4' /> : <Copy className='w-4 h-4' />}
            {copyStatus ? 'Copied' : 'Copy'}
          </Button>
          <div className="relative">
            <Button
              className={`flex gap-2 ${isSubscribed ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : 'bg-gray-400 cursor-not-allowed'}`}
              onClick={handleDownload}
              disabled={!isSubscribed}
            >
              <Download className='w-4 h-4' /> Download
            </Button>
            {!isSubscribed && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                <Lock className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='bg-white shadow-lg border rounded-lg pt-24 md:pt-20'>
        <Editor
          ref={editorRef}
          initialValue="Your AI generated content will appear here!"
          initialEditType="wysiwyg"
          height="600px"
          useCommandShortcut={true}
        />
      </div>
    </div>
  );
}

export default OutputSection;
