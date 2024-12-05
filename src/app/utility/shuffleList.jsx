const ShuffleList = ({ shuffleData, setFormText, abcNumber }) => {

  return (
    <ul>
      {shuffleData.map((item, index) => (
        <li
          onClick={() => {
            setFormText(item);
            abcNumber(index); // アイテムがクリックされたときにインデックスを設定
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
