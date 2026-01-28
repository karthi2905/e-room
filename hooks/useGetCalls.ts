import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

export const useGetCalls = () => {
    const client = useStreamVideoClient();
    const { user } = useUser();
    const [calls, setCalls] = useState<Call[]>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadCalls = async () => {
            if (!client || !user) return;

            setIsLoading(true);

            try {
                // Only fetch calls where the current user is a member
                const { calls } = await client.queryCalls({
                    filter_conditions: {
                        $or: [
                            { created_by_user_id: user.id },
                            { members: { $in: [user.id] } },
                        ],
                    },
                    sort: [{ field: 'starts_at', direction: -1 }],
                    watch: true,
                });

                setCalls(calls);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCalls();
    }, [client, user]);

    const now = new Date();

    const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
        return (startsAt && new Date(startsAt) < now && endedAt);
    });

    const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
        return startsAt && new Date(startsAt) > now;
    });

    return { endedCalls, upcomingCalls, callRecordings: calls, isLoading };
};
