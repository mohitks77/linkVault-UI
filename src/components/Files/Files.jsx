import { Box } from "@mui/material";
import CustomInput from "../Utils/CustomInput";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import FileTable from "./FileTable";
import { useDebounce } from "../Utils/Debounce";
import DataBadge from "./DataBadge";

const Files = () => {
  const { user } = useAuth0();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [filterResults, setFilterResults] = useState(data);
  const [trigger, setTrigger] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({ active: 0, expired: 0 });

  const debouncedSearch = useDebounce(searchQuery, 400);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/pastes/user/${user.sub}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setFilterResults(result);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.sub, trigger]);

  const getStats = () => {
    let exp = 0;
    let act = 0;

    for (let i = 0; i < data?.length; i++) {
      if (data[i]?.expired) exp++;
      else act++;
    }

    setStats({
      active: act,
      expired: exp,
    });
  };

  useEffect(() => {
    getStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data) {
      const filteredFiles = data?.filter((file) => {
        if (debouncedSearch === "") {
          return file;
        } else {
          return file?.filename
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase());
        }
      });
      setFilterResults(filteredFiles);
    }
  }, [debouncedSearch, data]);

  return (
    <Box
      sx={{
        width: "86vw",
        bgcolor: "var(--bgcolor)",
        height: "100vh",
        p: 6,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          fontFamily: "monospace",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomInput
          placeholder="Search your file"
          text={searchQuery}
          setText={setSearchQuery}
        />
        <DataBadge text="TOTAL" value={data?.length || 0} colorType="total" />
        <DataBadge
          text="ACTIVE"
          value={data?.filter((f) => !f.expired).length || 0}
          colorType="active"
        />
        <DataBadge
          text="EXPIRED"
          value={data?.filter((f) => f.expired).length || 0}
          colorType="expired"
        />
      </Box>
      {isLoading ? (
        <Box
          sx={{
            p: 2,
            color: "var(--header)",
            fontFamily: "monospace",
            fontSize: "14px",
          }}
        >
          Loading your data
        </Box>
      ) : (
        <FileTable
          tableData={filterResults}
          setTrigger={setTrigger}
          trigger={trigger}
          query={searchQuery}
        />
      )}
    </Box>
  );
};

export default Files;
