"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// components
import TaskCard from "./TaskCard";

const TaskCardList = ({ data, handleDelete, handleEdit }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <TaskCard
          key={post._id}
          post={post}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setAllPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (id) => {
    router.push(`/update-task?id=${id}`);
  };

  const handleDelete = async (id) => {
    const hasConfirmed = confirm("Are you sure you want to delete this task?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/task/${id.toString()}`, {
          method: "DELETE",
        });

        const filteredPost = allPosts.filter((item) => item._id !== id);

        setAllPosts(filteredPost);
        setSearchText("")
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filterTasks = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) => regex.test(item.title)
    );
  };

  // search function
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterTasks(e.target.value);
        setSearchedResults(searchResult);
      }, 300)
    );
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a task"
          required
          onChange={handleSearchChange}
          value={searchText}
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <TaskCardList
          data={searchedResults}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ) : (
        <TaskCardList
          data={allPosts}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </section>
  );
};

export default Feed;
