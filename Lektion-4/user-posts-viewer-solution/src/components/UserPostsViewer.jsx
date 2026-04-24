import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import PostList from './PostList';

/**
 * USER POSTS VIEWER - Övning för Lektion 4: useEffect och Lifecycle
 *
 * Part 1: Hämta och visa användare (Basic useEffect)
 * - Använd useState för users, error, och loading (som objekt: { users: true, posts: false })
 * - Använd useEffect med tom dependency array [] för att hämta användare vid mount
 * - Fetch från: https://jsonplaceholder.typicode.com/users
 * - Uppdatera loading state med spread operator: setLoading(prev => ({ ...prev, users: false }))
 * - Hantera error state om något går fel
 * - Conditional rendering med && operator istället för early returns
 * - Rendera UserList-komponenten med users som prop
 *
 * Part 2: Visa inlägg för vald användare (useEffect med dependencies)
 * - Lägg till useState för selectedUserId
 * - Lägg till useState för posts
 * - Använd useEffect med [selectedUserId] i dependency array
 * - När selectedUserId ändras, hämta inlägg från:
 *   https://jsonplaceholder.typicode.com/posts?userId={selectedUserId}
 * - Uppdatera loading.posts när posts hämtas
 * - Rendera PostList-komponenten med posts som prop
 *
 * Part 3: Cleanup med AbortController (Advanced)
 * - Använd AbortController för att avbryta gamla fetch requests
 * - Returnera cleanup function från useEffect
 * - Detta förhindrar race conditions när användaren byter användare snabbt
 *
 * Part 4 (BONUS): Lägg till en timer (setInterval)
 * - Visa hur länge användaren har tittat på nuvarande användares inlägg
 * - Använd setInterval i useEffect
 * - Glöm inte cleanup med clearInterval!
 * - Functional update: setSeconds(s => s + 1)
 *
 * Part 5 (EXTRA BONUS): Sök/filter med debouncing
 * - Lägg till ett sökfält för att filtrera användare
 * - Använd setTimeout i useEffect för debouncing
 * - Vänta 500ms efter sista input innan filtrering
 */

function UserPostsViewer() {
    // State för användare
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    // Konsoliderad loading state - ett objekt för alla loading states
    const [loading, setLoading] = useState({
        users: true,
        posts: false
    });

    // State för vald användare och inlägg
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [posts, setPosts] = useState([]);

    // BONUS: Timer state
    const [viewTime, setViewTime] = useState(0);

    // EXTRA BONUS: Sök state
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    // Part 1: Hämta användare vid mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(prev => ({ ...prev, users: true }));
                const response = await fetch('https://jsonplaceholder.typicode.com/users');

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();
                setUsers(data);
                setFilteredUsers(data); // Initiera filtered users
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching users:', err);
            } finally {
                setLoading(prev => ({ ...prev, users: false }));
            }
        };

        fetchUsers();
    }, []); // Tom array = körs en gång vid mount

    // Part 2 & 3: Hämta inlägg när selectedUserId ändras (med AbortController cleanup)
    useEffect(() => {
        if (!selectedUserId) {
            setPosts([]);
            return;
        }

        const controller = new AbortController();

        const fetchPosts = async () => {
            try {
                setLoading(prev => ({ ...prev, posts: true }));
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`,
                    { signal: controller.signal } // Cleanup möjlighet
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data = await response.json();
                setPosts(data);
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Error fetching posts:', err);
                }
            } finally {
                setLoading(prev => ({ ...prev, posts: false }));
            }
        };

        fetchPosts();

        // Cleanup function - avbryt request om komponenten unmountar eller userId ändras
        return () => {
            controller.abort();
        };
    }, [selectedUserId]); // Körs när selectedUserId ändras

    // Part 4 (BONUS): Timer för att mäta hur länge användaren tittar på inlägg
    useEffect(() => {
        if (!selectedUserId) return; // Starta inte timer om ingen användare är vald

        // Återställ timer när ny användare väljs
        setViewTime(0);

        const interval = setInterval(() => {
            setViewTime(s => s + 1); // Functional update - viktigt!
        }, 1000);

        // Cleanup - stoppa timer när komponenten unmountar eller användare ändras
        return () => {
            clearInterval(interval);
        };
    }, [selectedUserId]);

    // Part 5 (EXTRA BONUS): Debounced search
    useEffect(() => {
        // Sätt en timeout som körs efter 500ms
        const timer = setTimeout(() => {
            if (searchTerm === '') {
                setFilteredUsers(users);
            } else {
                const filtered = users.filter(user =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredUsers(filtered);
            }
        }, 500);

        // Cleanup - avbryt timeout om användaren skriver igen
        return () => {
            clearTimeout(timer);
        };
    }, [searchTerm, users]); // Körs när searchTerm eller users ändras

    const handleUserSelect = (userId) => {
        setSelectedUserId(userId);
    };

    return (
        <div className="user-posts-viewer">
            {/* Loading state för users */}
            {loading.users && <div className="loading">Loading users...</div>}

            {/* Error state */}
            {error && <div className="error">Error: {error}</div>}

            {/* Main content - visa bara när inte loading och inget error */}
            {!loading.users && !error && (
                <>
                    {/* EXTRA BONUS: Sökfält */}
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="content">
                        <div className="users-section">
                            <h2>Users ({filteredUsers.length})</h2>
                            <UserList
                                users={filteredUsers}
                                onUserSelect={handleUserSelect}
                                selectedUserId={selectedUserId}
                            />
                        </div>

                        <div className="posts-section">
                            {selectedUserId ? (
                                <>
                                    <h2>
                                        Posts by {users.find(u => u.id === selectedUserId)?.name}
                                        {/* BONUS: Visa timer */}
                                        <span className="view-time"> (Viewing for {viewTime}s)</span>
                                    </h2>
                                    {loading.posts ? (
                                        <div className="loading">Loading posts...</div>
                                    ) : (
                                        <PostList posts={posts} />
                                    )}
                                </>
                            ) : (
                                <div className="placeholder">
                                    <p>Select a user to view their posts</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserPostsViewer;
