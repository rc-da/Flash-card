import { useState } from "react";

const initialCards = [
  { id: 1, front: "React is library or Framework", back: "Framework" },
  { id: 2, front: "React reacts to changes of ", back: "State" },
];

export default function App() {
  const [cardList, setCardList] = useState(initialCards);
  const [onAdd, setonAdd] = useState(false);
  const [sortedList, setSortedList] = useState(cardList);

  function handleSort(sortType) {
    if (sortType === "input") setSortedList(cardList);

    if (sortType === "front")
      setSortedList(
        cardList.slice().sort((a, b) => a.front.localeCompare(b.front))
      );

    if (sortType === "back")
      setSortedList(
        cardList.slice().sort((a, b) => a.back.localeCompare(b.back))
      );
  }

  function handleAddCard(newCard) {
    setCardList([...cardList, newCard]);
    setSortedList([...cardList, newCard]);
  }

  function handleClear() {
    setCardList("");
    setSortedList("");
  }

  return (
    <div className={!onAdd ? "app" : "with-form"}>
      <Title />
      {onAdd ? <Cardform handleAddCard={handleAddCard} /> : null}
      <Button onClick={() => setonAdd(!onAdd)}>
        {onAdd ? "Close" : "Add Card"}
      </Button>
      <Flashcards
        handleClear={handleClear}
        handleSort={handleSort}
        sortedList={sortedList}
      />
    </div>
  );
}

function Title() {
  return <h2>Flash Cards</h2>;
}

function Cardform({ handleAddCard }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  function onAddCard(e) {
    e.preventDefault();
    if (front === "" || back === "") return;
    const id = crypto.randomUUID();
    const newCard = { id, front, back };
    handleAddCard(newCard);
    setBack("");
    setFront("");
  }

  return (
    <form className="card-form">
      <label>Front</label>
      <input
        type="text"
        name="front"
        value={front}
        onChange={(e) => setFront(e.target.value)}
      />
      <br></br>
      <label>Back</label>
      <input
        type="text"
        value={back}
        onChange={(e) => setBack(e.target.value)}
      />
      <br></br>
      <Button onClick={onAddCard}>Add</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

function Flashcards({ handleClear, handleSort, sortedList }) {
  const [selectedID, setSelectID] = useState(null);

  function selected(id) {
    console.log("the id", id);
    setSelectID(id !== selectedID ? id : null);
  }

  return (
    <div className="flashcard">
      <div className="changes">
        <ClearList handleClear={handleClear} />
        <Sorting handleSort={handleSort} />
      </div>

      {sortedList !== "" &&
        sortedList.map((card) => (
          <Card
            cardDetails={card}
            key={card.id}
            selectedID={selectedID}
            selected={selected}
          />
        ))}
    </div>
  );
}

function Card({ cardDetails, selectedID, selected }) {
  const selectedCard = cardDetails.id === selectedID;

  return (
    <div
      className={selectedCard ? "selected" : "card"}
      onClick={() => selected(cardDetails.id)}
    >
      {selectedCard ? cardDetails.back : cardDetails.front}
    </div>
  );
}

function Sorting({ handleSort }) {
  const [sort, setSort] = useState("input");

  function handleChange(e) {
    console.log("selected sort type", e.target.value);
    setSort(e.target.value);
    handleSort(e.target.value);
  }

  return (
    <>
      <select value={sort} onChange={handleChange}>
        <option value={"input"}>Sort by input order</option>
        <option value={"front"}>Sort by Front content</option>
        <option value={"back"}>Sort by Back content</option>
      </select>
    </>
  );
}

function ClearList({ handleClear }) {
  return (
    <>
      <Button onClick={handleClear}>Clear list</Button>
    </>
  );
}
