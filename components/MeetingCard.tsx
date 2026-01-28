'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { avatarImages } from '@/constants';
import { useToast } from './ui/use-toast';
import { Calendar, Copy, Play, Video } from 'lucide-react';

interface MeetingCardProps {
    title: string;
    date: string;
    icon: string;
    isPreviousMeeting?: boolean;
    isRecording?: boolean;
    buttonIcon1?: string;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

const MeetingCard = ({
    icon,
    title,
    date,
    isPreviousMeeting,
    isRecording,
    buttonIcon1,
    handleClick,
    link,
    buttonText,
}: MeetingCardProps) => {
    const { toast } = useToast();

    // Hide avatars for recordings AND previous meetings
    const showAvatars = !isRecording && !isPreviousMeeting;

    return (
        <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[20px] bg-dark-1/40 backdrop-blur-lg border border-white/10 px-5 py-8 xl:max-w-[568px] transition-all hover:border-blue-1/50 hover:shadow-lg hover:shadow-blue-1/10 group">
            <article className="flex flex-col gap-5">
                <div className="flex items-start gap-3">
                    <div className="flex-center size-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/5 p-2 group-hover:bg-blue-1/20 transition-colors">
                        <Image src={icon} alt="meeting" width={28} height={28} />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold leading-snug text-white line-clamp-2">{title}</h1>
                        <p className="text-base font-medium text-gray-400 flex items-center gap-2">
                            {date}
                        </p>
                    </div>
                </div>
            </article>

            <article className={cn('flex justify-center relative mt-4', {})}>
                {showAvatars && (
                    <div className="relative flex w-full max-sm:hidden">
                        {avatarImages.map((img, index) => (
                            <Image
                                key={index}
                                src={img}
                                alt="attendees"
                                width={40}
                                height={40}
                                className={cn('rounded-full border-2 border-dark-1', { absolute: index > 0 })}
                                style={{ top: 0, left: index * 28 }}
                            />
                        ))}
                        <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-1 bg-dark-4">
                            <span className="text-xs font-semibold">+5</span>
                        </div>
                    </div>
                )}

                <div className="flex w-full gap-2 items-center">
                    {/* Primary Action Button */}
                    <Button
                        onClick={handleClick}
                        className="rounded-lg bg-blue-1 px-6 py-4 text-sm font-semibold hover:bg-blue-1/80 min-w-[120px]"
                    >
                        {buttonIcon1 && (
                            <Image src={buttonIcon1} alt="feature" width={18} height={18} className="mr-2" />
                        )}
                        {buttonText}
                    </Button>

                    {/* Copy Link Button - Only for upcoming meetings and recordings */}
                    {!isPreviousMeeting && (
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                toast({
                                    title: 'Link Copied',
                                });
                            }}
                            className="bg-dark-3 px-6 py-4 text-sm font-semibold hover:bg-dark-2 flex items-center gap-2"
                        >
                            <Copy className="w-4 h-4" />
                            Copy Link
                        </Button>
                    )}
                </div>
            </article>
        </section>
    );
};

export default MeetingCard;
