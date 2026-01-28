'use client';

import MeetingTypeList from '@/components/MeetingTypeList';
import { useGetCalls } from '@/hooks/useGetCalls';
import React from 'react';

const Home = () => {
  const now = new Date();
  const { upcomingCalls } = useGetCalls();

  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).replace('pm', 'PM').replace('am', 'AM');
  const date = (new Intl.DateTimeFormat('en-IN', { dateStyle: 'full', timeZone: 'Asia/kolkata' })).format(now);

  // Get the next upcoming meeting
  const nextMeeting = upcomingCalls && upcomingCalls.length > 0
    ? upcomingCalls.sort((a, b) => {
      const aTime = new Date(a.state?.startsAt || 0).getTime();
      const bTime = new Date(b.state?.startsAt || 0).getTime();
      return aTime - bTime;
    })[0]
    : null;

  // Format the meeting time
  const upcomingMeetingTime = nextMeeting?.state?.startsAt
    ? new Date(nextMeeting.state.startsAt).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace('pm', 'PM').replace('am', 'AM')
    : null;

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          {/* Only show upcoming meeting if there is one */}
          {upcomingMeetingTime && (
            <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
              Upcoming Meeting at: {upcomingMeetingTime}
            </h2>
          )}
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='font-medium text-lg text-sky-1 lg:text-2xl'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
