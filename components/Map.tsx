import { useEffect, useRef } from "react";

export default function DynamicMap() {
  const mapContainer = useRef<HTMLElement | string>("");
  return (
    <div>
      <div id="google-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.6106123594213!2d110.39570481518518!3d-7.724859178690616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59f2a05006cf%3A0x74754efb3dcc01a1!2sMillion%20Candle%20-%20Produsen%20Lilin%20Batang!5e0!3m2!1sen!2sid!4v1679300429832!5m2!1sen!2sid"
          width="100%"
          height="100%"
          frameBorder={0}
          style={{ border: 0 }}
          allowFullScreen={true}
          aria-hidden="false"
          tabIndex={0}
          className="h-screen"
        ></iframe>
      </div>
    </div>
  );
}
