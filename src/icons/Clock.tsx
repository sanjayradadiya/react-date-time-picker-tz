import React from "react";

const Clock = React.memo(() => {
  return (
    <>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 512 512"
      >
        <path d="M329.372 374.628l-105.372-105.373v-141.255h64v114.745l86.628 86.627zM256 0c-141.385 0-256 114.615-256 256s114.615 256 256 256 256-114.615 256-256-114.615-256-256-256zM256 448c-106.039 0-192-85.961-192-192s85.961-192 192-192c106.039 0 192 85.961 192 192s-85.961 192-192 192z"></path>
      </svg>
    </>
  );
});

export default Clock;
