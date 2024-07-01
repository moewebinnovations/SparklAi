"use client";
import React, { useState } from 'react';
import { TEMPLATE } from '../../_components/TemplateListSection';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: (formData: any) => void;
  loading: boolean;
  isSubscribed: boolean; // Add the isSubscribed prop
}

function FormSection({ selectedTemplate, userFormInput, loading, isSubscribed }: PROPS) {
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    userFormInput(formData);
  };

  return (
    <div className="p-8 shadow-md border rounded-lg bg-white max-w-lg mx-auto">
      <div className="flex items-center mb-5">
        <div className="bg-indigo-100 p-4 rounded-full">
          <FontAwesomeIcon icon={selectedTemplate?.icon} className="text-indigo-600" />
        </div>
        <div className="ml-4">
          <h2 className="font-bold text-2xl text-indigo-600">{selectedTemplate?.name}</h2>
          <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>
        </div>
      </div>
      <form className="mt-6" onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={index} className="my-4">
            <label className="font-bold text-sm text-gray-700">{item.label}</label>
            {item.field === 'input' ? (
              <Input name={item.name} required={item?.required} onChange={handleInputChange} className="mt-2" />
            ) : item.field === 'textarea' ? (
              <Textarea name={item.name} required={item?.required} onChange={handleInputChange} className="mt-2" />
            ) : null}
          </div>
        ))}
        <Button type="submit" className="w-full py-3 mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:bg-indigo-500 text-white font-semibold rounded-md transition-all" disabled={loading}>
          {loading && <Loader2Icon className="animate-spin mr-2" />}
          Generate Content
        </Button>
      </form>
      {isSubscribed ? (
        <div className="mt-8 p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-center hidden md:block">
          <div className="bg-indigo-100 p-4 rounded-full inline-block mb-2">
            <FontAwesomeIcon icon={faCheck} className="text-indigo-600" size="2x" />
          </div>
          <h3 className="text-xl font-semibold">You are a premium member!</h3>
          <p className="text-gray-200 mt-2 mb-4">Thank you for subscribing. Manage your subscription below.</p>
          <Link href={'/dashboard/billing'}>
          <Button className="bg-white text-indigo-600 py-2 px-4 rounded-md transition-all hover:bg-gradient-to-r from-purple-500 to-indigo-500 hover:text-white">
            Manage Subscription
          </Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-center hidden md:block">
          <div className="bg-indigo-100 p-4 rounded-full inline-block mb-2">
            <FontAwesomeIcon icon={faStar} className="text-indigo-600" size="2x" />
          </div>
          <h3 className="text-xl font-semibold">Unlock Advanced Features</h3>
          <p className="text-gray-200 mt-2 mb-4">Upgrade to our premium plan to access more advanced tools and features.</p>
          <Button className="bg-white text-indigo-600 py-2 px-4 rounded-md transition-all hover:bg-gradient-to-r from-purple-500 to-indigo-500 hover:text-white">
            Upgrade to Premium
          </Button>
        </div>
      )}
    </div>
  );
}

export default FormSection;
