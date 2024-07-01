import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/form/Input";
import UsersLoading from "@/components/ui/loading/UsersLoading";
import useInput from "@/hooks/useInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import HttpRequest from "@/utils/HttpRequest";
import Head from "next/head";

const searchUsers = async (payload) =>
  await HttpRequest.get(`users/search/${payload}`);

const SearchPage = () => {
  const router = useRouter();

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

  console.log("searchedUsers: ", searchedUsers);

  return (
    <>
      <Head>
        <meta name="description" content="Search users in instamern" />
        <meta name="keywords" content="instamern, huseyin ates" />
        <title>Search | Instamern</title>
      </Head>
      <section className="relative py-6 mb-4">
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
            variant={theme}
            className={"mb-4 last:mb-0"}
          />
        )}
        {!isSearchedUsersLoading && searchedUsers.length !== 0 && (
          <ul>
            {searchedUsers.map((searchedUser) => (
              <li className="flex mb-4 last:mb-0" key={searchedUser._id}>
                <Link href={"/"} className="flex gap-3">
                  {searchedUser.user_photo ? (
                    <Image src={searchedUser.user_photo} />
                  ) : (
                    <Avatar
                      size={"lg"}
                      letter={searchedUser.user_fullname.slice(0, 1)}
                    />
                  )}
                  <section className="text-sm">
                    <h1>{searchedUser.user_fullname}</h1>
                    <p>{searchedUser.user_username}</p>
                  </section>
                </Link>
                <Button type={"button"} variant={"link"} className={"ms-auto"}>
                  Follow
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default SearchPage;
