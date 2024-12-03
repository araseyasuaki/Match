const ShuffleList = ({ shuffleData, setFormText, handleAlphabetClick }) => {
  return (
    <ul>
      {shuffleData.map((item, index) => (
        <li
          onClick={() => {
            setFormText(item);
            handleAlphabetClick(index); // アイテムがクリックされたときにインデックスを設定
          }}
          key={index}
        >
          <span>{String.fromCharCode(65 + index)}</span> {item}
        </li>
      ))}
    </ul>
  );
};

export default ShuffleList;
