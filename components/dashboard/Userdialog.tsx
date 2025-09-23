'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CoachingExpert } from './options';
import Image from 'next/image';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';

interface UserdialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  coachingOption: string;
}

const Userdialog: React.FC<UserdialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  coachingOption,
}) => {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [topic, setTopic] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createDiscussionRoom = useMutation(api.discussionRoom.create);

  const onClickNext = async () => {
    if (!selectedExpert || !topic) return;

    setLoading(true);

    const result = await createDiscussionRoom({
      topic,
      expertName: selectedExpert,
      coachingOption,
    });

    setLoading(false);
    onOpenChange(false);
    router.push(`/discussion/${result}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="mb-4 text-gray-600 dark:text-gray-400">
            {description}
          </DialogDescription>
        </DialogHeader>

        <Textarea
          placeholder="Enter your topic here..."
          className="w-full min-h-[100px] mb-6"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <h4 className="text-md font-semibold mb-2 text-gray-900 dark:text-white">
          Select your coaching expert
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
          {CoachingExpert.map((expert, index) => (
            <div
              key={index}
              onClick={() => setSelectedExpert(expert.name)}
              className={`p-3 rounded-xl text-center cursor-pointer transition-all border-2 ${
                selectedExpert === expert.name
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                  : 'border-transparent'
              } hover:shadow-sm hover:scale-105`}
            >
              <Image
                src={expert.avatar}
                alt={expert.name}
                width={80}
                height={80}
                className="rounded-full object-cover mx-auto mb-2"
              />
              <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {expert.name}
              </h2>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <DialogClose asChild>
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
          </DialogClose>

          <Button
            size="sm"
            onClick={onClickNext}
            className={`flex items-center gap-2 font-semibold rounded-md transition-all text-white px-4 py-2 text-sm ${
              !topic || !selectedExpert
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={!topic || !selectedExpert}
          >
            {loading ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Next <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Userdialog;
