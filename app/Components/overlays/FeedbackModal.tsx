'use client';

import { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import FeedbackForm from '../forms/FeedbackForm';

export default function FeedbackModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Dialog
      className="relative z-50"
      initialFocus={textareaRef}
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-md bg-gray p-4">
          <Dialog.Title className="text-xl font-semibold">
            Feedback
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-lg text-gray-light">
            Duplicate detection is still in development. If you have any
            feedback about your results, fire away!
          </Dialog.Description>

          <FeedbackForm textareaRef={textareaRef} setOpen={setOpen} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
