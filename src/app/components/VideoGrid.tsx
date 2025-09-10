"use client";

import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import { SanityDocument } from "next-sanity";
import SplashScreen from './SplashScreen';

interface PostWithVideo extends SanityDocument {
    title: string;
    publishedAt: string;
    videoPlaybackId: string | null;
    thumbnail: string;
}

type VideoContentProps = {
    posts: PostWithVideo[];
}

export default function VideoGrid({ posts }: VideoContentProps) {
    const [showSplash, setShowSplash] = useState(true);

    const handleSplashFinish = () => {
        setShowSplash(false);
    };

    return (
        <>
            {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
            <div className={`relative w-screen h-screen ${showSplash ? 'hidden' : ''}`}>
                <div className="grid grid-cols-3 grid-rows-2 gap-0 w-full h-full">
                    {posts && posts.map((post) => {
                        return (
                            <div key={post._id} className="w-full h-full relative border border-pink-500">
                                <VideoPlayer playbackId={post.videoPlaybackId} />

                                <div className="absolute top-2 left-2 text-pink-500 font-mono text-sm">
                                    {post.title}
                                </div>
                                <div className="absolute top-2 right-2 text-pink-500 font-mono text-sm">
                                    {post.publishedAt}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}