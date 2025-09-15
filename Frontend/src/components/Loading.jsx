import React, { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton';

const Loading = ({ isOpen }) => {

  const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
        const timer = setTimeout(() => setShowLoading(true), 100);
        return () => {
            clearTimeout(timer);
            setShowLoading(false);
        };
        } else {
        setShowLoading(false);
        }
    }, [isOpen]);

    if (!showLoading) return null;

    return (
        <div className="w-screen h-screen bg-background text-muted-foreground flex flex-col">
        <div className="h-16 border-b">
            <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
            <Skeleton className="h-8 w-24 rounded-md" />

            <div className="flex gap-6">
                <Skeleton className="h-6 w-20 rounded" />
                <Skeleton className="h-6 w-20 rounded" />
                <Skeleton className="h-6 w-20 rounded" />
                <Skeleton className="h-6 w-20 rounded" />
            </div>

            <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-6 w-20 rounded" />
            </div>
            </div>
        </div>

            <main className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Skeleton className="h-32 rounded-xl" />
                        <Skeleton className="h-32 rounded-xl" />
                        <Skeleton className="h-32 rounded-xl" />
                    </div>

                    <div>
                        <Skeleton className="h-100 w-full rounded-xl" />
                    </div>
                    
                    <div className="w-full">
                    <div className="max-w-5xl mx-auto px-14">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        <Skeleton className="h-32 rounded-xl" />
                        <Skeleton className="h-32 rounded-xl" />
                        </div>
                    </div>
                    </div>

                </div>
            </main>
        </div>
    );
}


export default Loading
