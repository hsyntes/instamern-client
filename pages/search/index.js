import Head from "next/head";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Input from "@/components/ui/form/Input";
import UsersLoading from "@/components/ui/loading/UsersLoading";
import ListUsers from "@/components/ui/users/ListUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import useInput from "@/hooks/useInput";
import { searchUsers } from "@/utils/helpers";

const SearchPage = () => {
  const themeState = useSelector((state) => state.theme);

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [inputTheme, setInputTheme] = useState("");
  const [loadingTheme, setLoadingTheme] = useState("");

  const { theme } = themeState;

  const {
    state: { value: search, isValid: isSearchValid },
    handleOnChange: handleSearchOnChange,
    handleOnClear: handleSearchOnClear,
  } = useInput();

  const { isLoading: isSearchedUsersLoading } = useQuery(
    ["searchUsers", search],
    {
      queryFn: async function () {
        if (isSearchValid) {
          const data = await searchUsers(search);

          if (data.status === "success") setSearchedUsers(data.data.users);
        } else setSearchedUsers([]);
      },

      refetchOnWindowFocus: false,
    }
  );

  useEffect(
    function () {
      setInputTheme(theme);
      setLoadingTheme(theme);
    },
    [theme]
  );

  return (
    <>
      <Head>
        <meta name="description" content="Search users in instamern" />
        <meta name="keywords" content="instamern, huseyin ates" />
        <title>Search | Instamern</title>
      </Head>
      <section className="relative py-6">
        <Input
          type={"text"}
          name={"search"}
          variant={inputTheme}
          placeholder={"Search"}
          value={search}
          onChange={handleSearchOnChange}
          autoFocus={true}
        />
        {isSearchValid ? (
          <FontAwesomeIcon
            icon={faTimesCircle}
            size="sm"
            className="absolute text-muted dark:text-muted-dark hover:!text-dark hover:dark:!text-white top-1/2 right-2 -translate-y-1/2 cursor-pointer transition-all"
            onClick={() => handleSearchOnClear("search")}
          />
        ) : (
          <FontAwesomeIcon
            icon={faSearch}
            size="sm"
            className="absolute text-muted dark:text-muted-dark top-1/2 right-2 -translate-y-1/2"
          />
        )}
      </section>
      <section>
        {isSearchedUsersLoading && (
          <UsersLoading
            count={15}
            variant={loadingTheme}
            className={"mb-4 last:mb-0"}
          />
        )}
        {!isSearchedUsersLoading && searchedUsers.length !== 0 && (
          <ListUsers users={searchedUsers} />
        )}
      </section>
    </>
  );
};

export default SearchPage;
