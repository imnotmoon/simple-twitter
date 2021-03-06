import React, { useState, useEffect } from "react";

/// useInput
const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const App = () => {
  const [item, setItem] = useState(1);
  const incrementItem = () => {
    setItem(item + 1);
  };
  const decrementItem = () => setItem(item - 1);
  return (
    <div className="App">
      <h1>Hello {item}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={incrementItem}>Increment</button>
      <button onClick={decrementItem}>Decrement</button>
    </div>
  );
};


/// useTabs
const content = [
  {
    tab: "Section 1",
    content: "I'm the content of the Section 1"
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2"
  }
];

const useTabs = (initialTab, allTabs) => {
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex
  };
};

const App = () => {
  const { currentItem, changeItem } = useTabs(0, content);
  return (
    <div className="App">
      <h1>Hello</h1>
      {content.map((section, index) => (
        <button onClick={() => changeItem(index)}>{section.tab}</button>
      ))}
      <br />
      <div>{currentItem.content}</div>
    </div>
  );
};


/// useEffect
const App = () => {
  const [number, setNumber] = useState(0)
  const [aNumber, setAnumber] = useState(0)

  useEffect(() => {
    console.log("Hello")
  }, [number])

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={() => setNumber(number+1)}>{number}</button>
      <button onClick={() => setAnumber(aNumber+1)}>{aNumber}</button>
    </div>
  )
}


// useTitle
// hook for update window's title
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);

  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    console.log(htmlTitle.innerText);
    htmlTitle.innerText = title;
  };

  useEffect(updateTitle, [title]);
  return setTitle;
};

const App = () => {
  // useTitle??? state??? ?????? ????????? useEffect??? ????????? title??? ??????
  const titleUpdater = useTitle("Loading...");

  // 5??? ?????? ????????? ??????
  setTimeout(() => {
    titleUpdater("Home");
  }, 5000);

  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
};


/// useClick, useRef
// useRef : getElementById??? ???????????? ??????????????? ????????? ??? ??????.
const useClick = (onClick) => {

  // useClick??? ????????? component??? ??????
  const element = useRef();


  useEffect(() => {
    if (element.current) {
      console.log("asdfasdf");
      element.current.addEventListener("click", onClick);
    }

    // same as componentWillUnMount
    // useEffect ????????? ???????????? ????????? componentWillUnmount ???????????? ?????????.
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
    // dependency??? ????????? ?????????????????? ????????????????????? ??????.
    // ?????? componentDidMount ???????????? eventListenner??? ????????????.
  }, []);
  return element;
};

const App = () => {
  // ????????? ?????? ????????????
  const sayHello = () => console.log("say hello");

  // useRef : getElementById...
  // ref??? title??? component??? ??????
  const title = useClick(sayHello);

  return (
    <div className="App">
      <h1 ref={title}>Hello</h1>
    </div>
  );
}


/// useConfirm : ?????? hook??? ???????????? ????????? ??????
const useConfirm = (message = "", callback, rejection) => {
  // check callback, rejection validation
  if (!callback && typeof callback !== "function") {
    return;
  }
  if (!rejection && typeof callback !== "function") {
    return;
  }
  const confirmAction = () => {
    if (confirm(message)) {
      callback();
    } else {
      rejection();
    }
  };
  return confirmAction;
};

const App = () => {
  const deleteWorld = () => console.log("Deleteing the world");
  const abort = () => console.log("Aboted");
  const confirmDelete = useConfirm("Are you sure?", deleteWorld, abort);
  return (
    <div className="App">
      <button onClick={confirmDelete}>Delete the world</button>
    </div>
  );
}


/// usePreventLeave
const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    
    // ???????????? ????????? return function??? ?????????
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.addEventListener("beforeunload", listener);

  return [enablePrevent, disablePrevent];
};

const App = () => {
  const [protect, unprotect] = usePreventLeave();
  return (
    <div className="App">
      <h1>hello</h1>
      <button onClick={protect}>Protect</button>
      <button onClick={unprotect}>Unprotect</button>
    </div>
  );
}


// useBeforeLeave : y??? ???????????? 0?????? ?????? ????????????(top) ??????????????? ?????????
// useEffectf??? ???????????? browser??? eventListener??? ??????????????? ???.
const useBeforeLeave = (onBefore) => {
  if (typeof onBefore !== "function") {
    return;
  }

  const handle = (event) => {
    // top ???????????? ???????????? ????????? ???????????? ???????????????
    const { clientY } = event;
    if (clientY <= 0) {
      onBefore();
    }
  };
  useEffect(() => {
    document.addEventListener("mouseleave", handle);

    // only when unmount
    return () => document.removeEventListener("mouseleave", handle);
  });
};

export default function App() {
  const begForLife = () => console.log("please");
  useBeforeLeave(begForLife);
  return (
    <div className="App">
      <h1>hello</h1>
    </div>
  );
}



// useFadeIn
// css?????? ????????? ???????????? ??????
const useFadeIn = (duration = 1, delay = 1) => {
    if (typeof duration !== "number" || typeof delay !== "number") {
      return;
    }
  
    const element = useRef();
  
    useEffect(() => {
      if (element.current) {
        const { current } = element;
        current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
        current.style.opacity = 1;
      }
    }, []);
  
    return { ref: element, style: { opacity: 0 } };
  };
  
  export default function App() {
    // ????????? ?????? ?????????. ????????????
    const faedeInH1 = useFadeIn(1, 2);
    const fadeInP = useFadeIn(3, 3);
    return (
      <div className="App">
        <h1 {...faedeInH1}>hello</h1>
        <p {...fadeInP}>lorem ipsum</p>
      </div>
    );
  }
  

  
  /// useNetwork
  /// Network ????????? ?????? ???????????? ???
  const useNetwork = (onChange) => {
    const [status, setStatus] = useState(navigator.onLine);
  
    const handleChange = () => {
      if (typeof onChange === "function") {
        // online?????? offline??????, offline?????? online??????
        // toggle?????? ??????.
        setStatus(navigator.onLine);
      }
    };
  
    useEffect(() => {
      window.addEventListener("online", handleChange);
      window.addEventListener("offline", handleChange);
      () => {
        window.removeEventListener("online", handleChange);
        window.removeEventListener("offline", handleChange);
      };
    }, []);
  
    return status;
  };
  
  export default function App() {
    const handleNewtorkChange = (online) => {
      console.log(online ? "We just online" : "We are offline");
    };
    const onLine = useNetwork();
  
    return (
      <div className="App">
        <h1>{onLine ? "Online" : "Offline"}</h1>
      </div>
    );
  }