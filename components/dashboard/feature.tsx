'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Expertlist } from './options';
import { BadgeCheck } from 'lucide-react';
import Userdialog from './Userdialog';

const Feature = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleOpenDialog = (featureName: string) => {
    setSelectedFeature(featureName);
    setOpenDialog(true);
  };

  return (
    <div className="w-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-md rounded-2xl p-6 transition hover:shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
            <BadgeCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            My Workspace
          </h2>
         
        </div>
        
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {Expertlist.map((item, index) => (
          <div
            key={index}
            onClick={() => handleOpenDialog(item.name)}
            className="cursor-pointer flex flex-col items-center text-center bg-white dark:bg-gray-900 p-5 rounded-xl shadow hover:shadow-md transition duration-300"
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={70}
              height={70}
              className="mb-4 rounded-lg object-contain hover:rotate-12 transition-all"
            />
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.name}</h3>
          </div>
        ))}
      </div>

      {/* Dialog */}
      {openDialog && selectedFeature && (
        <Userdialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          title={selectedFeature}
          description={`Enter a topic to master your skills in "${selectedFeature}".`}
          coachingOption={selectedFeature} // ✅ pass the selected mode
        />
      )}
    </div>
  );
};

export default Feature;
