import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Dashboard() {
  const [counts, setCounts] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [todoByMonths, setTodoByMonths] = useState([]);
  const [usersWithoutTodo, setUsersWithoutTodo] = useState([]);
  const fetchCounts = async () => {
    try {
      const { data } = await API.get('/dashboard/status');
      setCounts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const topTodoUsers = async () => {
    try {
      const { data } = await API.get('/dashboard/top-todo-users');
      console.log(data, 'data');
      setTopUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const todosByMonths = async () => {
    try {
      const { data } = await API.get('/dashboard/todos-by-months');
      setTodoByMonths(data);
    } catch (error) {
      console.log(error);
    }
  };

  const withoutTodo = async () => {
    try {
      const { data } = await API.get('/dashboard/without-todo');
      console.log(data, 'data');
      setUsersWithoutTodo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCounts();
    topTodoUsers();
    todosByMonths();
    withoutTodo();
  }, []);
  return (
    <div className="w-full flex items-center bg-teal-lightest font-sans gap-5">
      <div className="bg-white rounded shadow p-6 m-4 w-full">
        <div className="mb-4">
          <div className="flex text-center items-center mb-2">
            <h1 className="text-grey-darkest flex-1 font-extrabold">
              Todo Summary
            </h1>
          </div>
          <div>
            {counts.length > 0 &&
              counts.map((item) => (
                <div className="flex justify-between">
                  <p className="w-full text-black font-semibold">{item._id}</p>
                  <p className="w-full text-black font-semibold">
                    {item.count}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6 m-4 w-full">
        <div className="mb-4">
          <div className="flex text-center items-center mb-2">
            <h1 className="text-grey-darkest flex-1 font-extrabold">
              Top Users
            </h1>
          </div>
          <div>
            {topUsers.length > 0 &&
              topUsers.map((item) => (
                <div className="flex justify-between">
                  <p className="w-full text-black font-semibold">
                    {item.email}
                  </p>
                  <p className="w-full text-black font-semibold">
                    {item.totalTodos}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6 m-4 w-full">
        <div className="mb-4">
          <div className="flex text-center items-center mb-2">
            <h1 className="text-grey-darkest flex-1 font-extrabold">
              Todo By Months
            </h1>
          </div>
          <div>
            {todoByMonths.length > 0 &&
              todoByMonths.map((item) => (
                <div className="flex justify-between">
                  <p className="w-full text-black font-semibold">{`${item._id.month}/${item._id.year}`}</p>
                  <p className="w-full text-black font-semibold">
                    {item.totalTodos}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6 m-4 w-full">
        <div className="mb-4">
          <div className="flex text-center items-center mb-2">
            <h1 className="text-grey-darkest flex-1 font-extrabold">
              User Without Todo
            </h1>
          </div>
          <div>
            {usersWithoutTodo.length > 0 &&
              usersWithoutTodo.map((item) => (
                <div className="flex justify-between">
                  <p className="w-full text-black font-semibold">
                    {item.email}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
