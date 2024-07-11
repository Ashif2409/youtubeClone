import React, { useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../store/hook";
import getHomePageVideos from "../store/reducers/getHomePageVideos";
import { Spinner } from "../components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "../components/Card";
import { clearVideo } from "../store";
import { initializeAdBlocker } from "../utils/adBlocker";

export const Home = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  const videoPlayerRef = useRef(null); // Define videoPlayerRef

  useEffect(() => {
    return () => {
      dispatch(clearVideo());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  useEffect(() => {
    const videoPlayer = videoPlayerRef.current;
    if (videoPlayer) {
      initializeAdBlocker(videoPlayer); // Call your ad blocker initialization function
    }
  }, [videoPlayerRef]); // Include videoPlayerRef in dependency array

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8 ">
              {videos.map((item) => {
                return <Card data={item} key={item.videoId} />;
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
