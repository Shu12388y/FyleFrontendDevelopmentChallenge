"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Types
interface Workout {
  type: string;
  minutes: number;
}

interface User {
  username: string;
  workouts: Workout[];
}

function Page() {
  const [userData, setUserData] = useState<User>({
    username: "",
    workouts: [{ type: "", minutes: 0 }],
  });

  const [users, setUsers] = useState<User[]>([]);
  const [showUsers, setShowUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const addWorkout = () => {
    setUserData((prev) => ({
      ...prev,
      workouts: [...prev.workouts, { type: "", minutes: 0 }],
    }));
  };

  const handleWorkoutChange = (
    index: number,
    key: keyof Workout,
    value: string | number
  ) => {
    const updatedWorkouts = userData.workouts.map((workout, i) =>
      i === index ? { ...workout, [key]: value } : workout
    );
    setUserData({ ...userData, workouts: updatedWorkouts });
  };

  const addUser = () => {
    if (userData.username && userData.workouts.length > 0) {
      setUsers([...users, { ...userData }]);
      setUserData({ username: "", workouts: [{ type: "", minutes: 0 }] });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div>
      {!showUsers ? (
        <Card>
          <CardHeader>
            <CardTitle>Health Challenge Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>User Name*</Label>
            <Input
              placeholder="Enter username"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />

            {userData.workouts.map((workout, index) => (
              <div key={index} className="flex flex-row items-center gap-6 mt-4">
                <div>
                  <Label>Workout Type*</Label>
                  <Select
                    onValueChange={(value) =>
                      handleWorkoutChange(index, "type", value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={workout.type || "Select workout"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Running">Running</SelectItem>
                      <SelectItem value="Cycling">Cycling</SelectItem>
                      <SelectItem value="Swimming">Swimming</SelectItem>
                      <SelectItem value="Yoga">Yoga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Workout Minutes*</Label>
                  <Input
                    type="number"
                    placeholder="Enter workout time"
                    value={workout.minutes}
                    onChange={(e) =>
                      handleWorkoutChange(index, "minutes", Number(e.target.value))
                    }
                  />
                </div>
              </div>
            ))}

            <Button className="mt-4" onClick={addWorkout}>
              + Add Workout
            </Button>
            <Button className="mt-4 ml-4" onClick={addUser}>
              Add User
            </Button>
            <Button className="mt-4 ml-4" onClick={() => setShowUsers(true)}>
              Show Users
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Users List</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search users..."
              className="mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="border rounded-md p-4">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-gray-100 mb-4"
                  >
                    <h2
                      className="text-lg font-semibold cursor-pointer hover:underline"
                      onClick={() => setSelectedUser(user)}
                    >
                      {user.username}
                    </h2>
                    <ul className="mt-2 list-disc pl-4">
                      {user.workouts.map((workout, i) => (
                        <li key={i}>
                          {workout.type} - {workout.minutes} min
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>No users found.</p>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
              <p>
                Page {currentPage} of {totalPages}
              </p>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>

            <Button className="mt-4" onClick={() => setShowUsers(false)}>
              Back to Add User
            </Button>
          </CardContent>
        </Card>
      )}

      {selectedUser && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{selectedUser.username}&apos;s Workout Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={selectedUser.workouts}>
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
            <Button className="mt-4" onClick={() => setSelectedUser(null)}>
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Page;
