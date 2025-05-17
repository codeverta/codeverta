import { DiscussionEmbed } from "disqus-react";

const DisqusThread = ({ url, identifier, title }) => {
  const disqusShortname = "souvenirlilin-id"; // Change this!
  const disqusConfig = {
    url: url,
    identifier: identifier,
    title: title,
  };

  return <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />;
};

export default DisqusThread;
