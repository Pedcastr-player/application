"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Icon } from "@/components/Icon";
import useDebounce from "@/hooks/useDebounce";
import { FeedSummary } from "@/types";
import { AppError } from "@/globals/errorHandlers";

export default function AddBar() {
  const [url, setUrl] = useState("");
  const [inputError, setInputError] = useState(false);
  const [debouncedUrl, setDebouncedUrl] = useState("");

  const debounceSetUrl = useDebounce({
    callback: () => {
      setDebouncedUrl(url);
    },
  });

  const {
    data: feed,
    refetch,
    error,
    isLoading,
  } = useQuery<FeedSummary | undefined>({
    queryKey: ["feed", debouncedUrl],
    queryFn: getFeed,
    enabled: !!debouncedUrl.length,
  });

  async function getFeed() {
    const response = await fetch("/api/feeds", {
      method: "POST",
      body: JSON.stringify({
        url: debouncedUrl,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setInputError(true);
      throw new AppError(payload);
    }

    return payload;
  }

  useEffect(() => {
    if (debouncedUrl.length) {
      refetch();
    }
  }, [debouncedUrl, refetch]);

  function onSubscribe() {
    console.log("subscribed to", feed);
  }

  const renderLoadingMessage = () => {
    if (isLoading) {
      return (
        <>
          <div className="bg-zinc-500 w-[120px] h-[120px]" />
          <section className="flex flex-col">
            <h1 className="text-sm">Retrieving feed information...</h1>
          </section>
        </>
      );
    }
  };

  const renderErrorMessage = () => {
    if (error?.message) {
      return <h1>{error.message}</h1>;
    }
  };

  const renderFeedCard = () => {
    if (feed) {
      return (
        <>
          {/* Disabling @next/next/no-img-element rule as we can't know the host for every feed images */}
          {/* eslint-disable-next-line  */}
          <img src={feed.image} alt="" className="w-[120px] h-[120px]" />
          <section className="flex flex-col">
            <div className="space-y-1">
              <h1 className="text-sm">{feed.title}</h1>
              <h2 className="text-xs">{feed.summary}</h2>
            </div>
            <button
              className="btn flex flex-row items-center space-x-1 mt-auto w-fit text-sm"
              onClick={onSubscribe}
            >
              <Icon name="add" size={18} />
              <span>Subscribe</span>
            </button>
          </section>
        </>
      );
    }
  };

  return (
    <div className="flex items-center p-3">
      <input
        className={`bg-transparent input ${
          inputError ? "error" : ""
        } w-full text-sm`}
        placeholder="Add a feed URL here"
        value={url}
        onChange={(e) => {
          setInputError(false);
          setUrl(e.target.value);
          debounceSetUrl();
        }}
      />
      {(feed || isLoading || error) && (
        <section className="fixed left-0 top-24 z-40 bg-zinc-400 w-full flex flex-row p-3 space-x-3">
          {renderLoadingMessage()}
          {renderErrorMessage()}
          {renderFeedCard()}
        </section>
      )}
    </div>
  );
}
