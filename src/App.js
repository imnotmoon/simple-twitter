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
  // useTitle의 state를 바꾼 것으로 useEffect로 하여금 title을 수정
  const titleUpdater = useTitle("Loading...");

  // 5초 뒤에 타이틀 변경
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
// useRef : getElementById와 유사하게 컴포넌트를 지정할 수 있음.
const useClick = (onClick) => {

  // useClick이 할당된 component와 연결
  const element = useRef();


  useEffect(() => {
    if (element.current) {
      console.log("asdfasdf");
      element.current.addEventListener("click", onClick);
    }

    // same as componentWillUnMount
    // useEffect 내에서 리턴받은 함수는 componentWillUnmount 단계에서 수행됨.
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
    // dependency가 있으면 클릭될때마다 이벤트리스너가 붙음.
    // 단지 componentDidMount 시점에만 eventListenner가 붙어야함.
  }, []);
  return element;
};

const App = () => {
  // 인자로 넘길 콜백함수
  const sayHello = () => console.log("say hello");

  // useRef : getElementById...
  // ref가 title인 component에 연결
  const title = useClick(sayHello);

  return (
    <div className="App">
      <h1 ref={title}>Hello</h1>
    </div>
  );
}


/// useConfirm : 딱히 hook을 사용하는 개념은 아님
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
    
    // 사이트를 나갈때 return function을 무효화
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
