import React from 'react'
import { format, parseISO, formatDistanceToNow } from 'date-fns';

function PostWidget({author,title,summary,createdAt}) {
  const originalDateString = createdAt;
  const parsedDate = parseISO(originalDateString);
  const formattedDate = formatDistanceToNow(parsedDate,{includeSeconds: true});

  return (
    <div className="mx-2 max-w-2xl my-10 text-left">
      <p className="mx-2 font-Roboto text-zinc-700 text-sm leading-tight">{author}</p>
      <p className="mx-2 mb-2 font-popins text-xl font-semibold">{title}</p>
      <p className="mx-2 font-Roboto text-zinc-500 leading-tight">{summary}</p>
      <p className="mx-2 mt-2 font-Roboto text-zinc-500 text-xs">{formattedDate}</p>
    </div>
  )
}

export default PostWidget