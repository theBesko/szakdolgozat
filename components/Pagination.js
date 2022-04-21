import { ButtonGroup, Button } from "react-bootstrap";

const btnArray = [];

export default function Pagination({ page, length, change }) {
  btnArray.length = 0;

  // ! length < 5
  if (length < 6) {
    for (let i = 0; i < length; i++) {
      btnArray.push(
        <Button
          active={page === i + 1}
          onClick={(e) => change(i + 1)}
          variant="outline-dark"
          key={`btn_${i + 1}`}
        >
          {i + 1}
        </Button>
      );
    }
  }

  // ! length > 5
  if (length > 5) {
    if (page < 3) {
      btnArray.push(
        <Button
          active={page === 1}
          onClick={(e) => change(1)}
          variant="outline-dark"
          key={`btn_1`}
        >
          1
        </Button>,
        <Button
          active={page === 2}
          onClick={(e) => change(2)}
          variant="outline-dark"
          key={`btn_2`}
        >
          2
        </Button>,
        <Button variant="outline-dark" onClick={(e) => change(3)} key={`btn_3`}>
          3
        </Button>,
        <Button variant="outline-dark" onClick={(e) => change(4)} key={`btn_4`}>
          4
        </Button>,
        <Button
          variant="outline-dark"
          onClick={(e) => change(length)}
          key={`btn_last`}
        >
          {">>"}
        </Button>
      );
    }

    if (page > length - 2) {
      btnArray.push(
        <Button variant="outline-dark" onClick={(e) => change(1)} key={`btn_1`}>
          {"<<"}
        </Button>,
        <Button
          variant="outline-dark"
          onClick={(e) => change(length - 3)}
          key={`btn_last-3`}
        >
          {length - 3}
        </Button>,
        <Button
          variant="outline-dark"
          onClick={(e) => change(length - 2)}
          key={`btn_last-2`}
        >
          {length - 2}
        </Button>,
        <Button
          active={page === length - 1}
          onClick={(e) => change(length - 1)}
          variant="outline-dark"
          key={`btn_last-1`}
        >
          {length - 1}
        </Button>,
        <Button
          onClick={(e) => change(length)}
          active={page === length}
          variant="outline-dark"
          key={`btn_last`}
        >
          {length}
        </Button>
      );
    }

    if (page > 2 && page < length - 1) {
      console.log(length - 2);
      btnArray.push(
        <Button variant="outline-dark" onClick={(e) => change(1)} key={`btn_1`}>
          {"<<"}
        </Button>,
        <Button
          variant="outline-dark"
          onClick={(e) => change(page - 1)}
          key={`btn_prev`}
        >
          {"<"}
        </Button>,
        <Button active variant="outline-dark" key={`btn_current`}>
          {page}
        </Button>,
        <Button
          variant="outline-dark"
          onClick={(e) => change(page + 1)}
          key={`btn_next`}
        >
          {">"}
        </Button>,
        <Button
          variant="outline-dark"
          onClick={(e) => change(length)}
          key={`btn_last`}
        >
          {">>"}
        </Button>
      );
    }
  }

  return <ButtonGroup>{btnArray}</ButtonGroup>;
}
