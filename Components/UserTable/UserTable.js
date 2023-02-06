import React from 'react'
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then(res => res.json())

const UserTable = () => {

    const { data, error } = useSWR(`/api/users`, fetcher, { refreshInterval: 1000 })

    console.log(data?.users);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>IsBanned</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {data && data.users.map(user =>
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>{user.isBanned === false ? "Allowed" : "Not Allowed"}</td>
                            </tr>
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UserTable