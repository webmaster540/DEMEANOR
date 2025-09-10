import { SanityDocument } from "next-sanity";
import VideoPlayer from "@/app/components/VideoPlayer";
import { client } from "@/sanity/lib/client";

interface PostWithVideo extends SanityDocument {
  title: string;
  publishedAt: string;
  videoPlaybackId: string | null;
}

const POSTS_QUERY = `*[_type == "post"]{
  _id,
  title,
  publishedAt,
  "thumbnail": thumbnail,
  "videoPlaybackId": video.asset->playbackId,
}`;

const options = { next: { revalidate: 0 } };

export default async function PrivatePage() {
    const posts = await client.fetch<PostWithVideo[]>(POSTS_QUERY, {}, options);

    return (
       <div className="relative w-screen h-screen">
            {/* <h1 className="absolute top-10 mx-auto text-4xl uppercase trackingg-wide">whereisuzi?</h1> */}
            <div className="grid grid-cols-3 grid-rows-2 gap-0 w-full h-full">
                {posts && posts.map(( post => {
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
                    )
                }))}
            </div>
        </div>
    )
}