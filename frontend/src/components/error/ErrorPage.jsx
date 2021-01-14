import React, { useEffect } from "react";

function ErrorCatch({ history }) {
  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    console.log(history);
    const unblock = history.block("정말 떠나실건가요?");
    return () => {
      unblock();
    };
  }, [history]);

  return (
    <section className="login">
      <div className="errormessage">
        <h1>500</h1>
        <h3>Server Error</h3>
        <h2>It's not you, it's me.</h2>

        <button onClick={goBack}>Go Back</button>
      </div>
    </section>
  );
}

export default ErrorCatch;
