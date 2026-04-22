import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import PostList from './PostList';

/**
 * USER POSTS VIEWER - Övning för Lektion 4: useEffect och Lifecycle
 *
 * Part 1: Hämta och visa användare (Basic useEffect)
 * ===================================================
 *
 * TODO:
 * 1. Skapa state för users (array), loading (boolean) och error (string/null)
 * 2. Skapa en useEffect med tom dependency array []
 * 3. I useEffect, skapa en async funktion fetchUsers som:
 *    - Sätter loading till true
 *    - Använder fetch för att hämta från: https://jsonplaceholder.typicode.com/users
 *    - Kontrollerar om response.ok, annars kasta ett fel
 *    - Konvertera response till JSON med await response.json()
 *    - Spara datan i users state med setUsers
 *    - Sätter error till null om allt gick bra
 *    - Catch errors och sätt error state
 *    - Finally: sätt loading till false
 * 4. Kalla på fetchUsers() i useEffect
 * 5. Rendera:
 *    - Om loading: visa <div className="loading">Loading users...</div>
 *    - Om error: visa <div className="error">Error: {error}</div>
 *    - Annars: visa UserList med users som prop
 *
 * Part 2: Visa inlägg för vald användare (useEffect med dependencies)
 * ====================================================================
 *
 * TODO:
 * 1. Skapa state för selectedUserId (number/null) och posts (array)
 * 2. Skapa state för postsLoading (boolean)
 * 3. Skapa en useEffect med [selectedUserId] i dependency array
 * 4. I useEffect:
 *    - Om selectedUserId är null, sätt posts till [] och return
 *    - Annars, hämta inlägg från: https://jsonplaceholder.typicode.com/posts?userId={selectedUserId}
 *    - Spara inlägg i posts state
 * 5. Skapa en funktion handleUserSelect(userId) som sätter selectedUserId
 * 6. Skicka handleUserSelect till UserList via onUserSelect prop
 * 7. Rendera PostList med posts som prop
 *
 * Part 3: Cleanup med AbortController (Advanced)
 * ===============================================
 *
 * TODO:
 * 1. I useEffect för posts (Part 2):
 *    - Skapa en AbortController: const controller = new AbortController()
 *    - Lägg till { signal: controller.signal } som andra argument till fetch
 *    - I catch block, kolla om err.name === 'AbortError' och logga "Fetch aborted"
 *    - Returnera en cleanup function som kallar controller.abort()
 * 2. Testa genom att snabbt klicka på olika användare - gamla requests ska avbrytas
 *
 * Part 4 (BONUS): Timer med setInterval
 * ======================================
 *
 * TODO:
 * 1. Skapa state för viewTime (number, börja på 0)
 * 2. Skapa en useEffect med [selectedUserId] i dependency array
 * 3. I useEffect:
 *    - Om !selectedUserId, return tidigt
 *    - Återställ viewTime till 0 med setViewTime(0)
 *    - Skapa interval: const interval = setInterval(() => { ... }, 1000)
 *    - I interval callback, använd functional update: setViewTime(s => s + 1)
 *    - Returnera cleanup function: () => clearInterval(interval)
 * 4. Visa viewTime i render: "Viewing for {viewTime}s"
 *
 * Part 5 (EXTRA BONUS): Sök med debouncing
 * =========================================
 * 
 * TODO:
 * 1. Skapa state för searchTerm (string) och filteredUsers (array)
 * 2. Initiera filteredUsers till users i useEffect när users laddas
 * 3. Skapa ett input-fält med value={searchTerm} och onChange
 * 4. Skapa en useEffect med [searchTerm, users] i dependency array
 * 5. I useEffect:
 *    - Skapa timeout: const timer = setTimeout(() => { ... }, 500)
 *    - I timeout callback, filtrera users baserat på searchTerm
 *    - Om searchTerm är tom, sätt filteredUsers till users
 *    - Annars, filtrera users där name eller email innehåller searchTerm
 *    - Returnera cleanup: () => clearTimeout(timer)
 * 6. Rendera UserList med filteredUsers istället för users
 *
 * TIPS:
 * - Kom ihåg att useEffect INTE kan vara async direkt
 * - Skapa async funktion inuti useEffect och kalla den
 * - Glöm inte cleanup functions för timers och fetch requests
 * - Använd functional updates i setInterval: setState(prev => prev + 1)
 * - Tom dependency array [] = körs en gång vid mount
 * - Med dependencies = körs när någon dependency ändras
 */

function UserPostsViewer() {
    // TODO: Implementera state här (Part 1, 2, 4, 5)

    // TODO: Implementera useEffect för att hämta användare (Part 1)

    // TODO: Implementera useEffect för att hämta inlägg (Part 2 & 3)

    // TODO: Implementera useEffect för timer (Part 4 - BONUS)

    // TODO: Implementera useEffect för debounced search (Part 5 - EXTRA BONUS)

    // TODO: Implementera handleUserSelect funktion (Part 2)

    // TODO: Implementera render logic
    return (
        <div className="user-posts-viewer">
            <p>TODO: Implementera UserPostsViewer komponenten enligt instruktionerna ovan!</p>
            <p>Se solution-mappen för fullständig lösning.</p>
        </div>
    );
}

export default UserPostsViewer;
