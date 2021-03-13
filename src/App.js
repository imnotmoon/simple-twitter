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
