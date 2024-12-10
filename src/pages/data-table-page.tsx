import * as React from "react";
import users from "../data/users.json";

const DataTablePage = () => {
  const [data, setData] = React.useState<any[]>(users);
  const [searchItem, setSearchItem] = React.useState<string>("");
  const [itemPerPage, setItemPerPage] = React.useState<number>(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(data.length / itemPerPage); // get round up number -> 36 /10 = 3.6 -> 4

  //lasitemOfPage = 1 * 10 => 10, 2 * 10 => 20, dan seterusnya...
  //firstItemOfPage = 10 - 10 => 0, 20 - 10 => 10, dan seterusnya..
  //currentPage++ || currentPage--

  const lastItemOfPage = currentPage * itemPerPage;
  const firstItemOfPage = lastItemOfPage - itemPerPage;

  // page 1 -> 1 - 10
  // page 2 -> 11 - 20
  // dan seterusnya...
  const currentItems = data.slice(firstItemOfPage, lastItemOfPage);

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const onSearchItemData = (value: string) => {
    if (value.trim() === "") {
      return setData(users);
    }
    const filteredData = data.filter((user: Record<string, string>) =>
      user.name.toLowerCase().includes(value.toLocaleLowerCase())
    );
    setData(filteredData);
  };

  return (
    <>
      <div>
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <button onClick={() => onSearchItemData(searchItem)}>Search</button>
      </div>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {[
              { label: "ID", key: "id" },
              { label: "Name", key: "name" },
              { label: "Age", key: "age" },
              { label: "Occupation", key: "occupation" },
            ].map(({ label, key }: { label: any; key: any }) => (
              <th style={{ borderBottom: "1px solid blue" }} key={key}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 1 ? (
            currentItems.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid pink" }}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.occupation}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No Data</td>
            </tr>
          )}
        </tbody>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <select
            value={itemPerPage}
            onChange={(e) => {
              setItemPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 15].map((total) => (
              <option key={total}>{total}</option>
            ))}
          </select>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </table>
    </>
  );
};

export default DataTablePage;
