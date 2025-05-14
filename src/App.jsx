import { useState, useEffect } from 'react';
import supabase from './supabase-client';
import Dashboard from './Dashboard';
import Header from './Header';
import styles from './App.module.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let authSubscription = null;

    const getCurrentSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          console.log(
            `Error getting session data: ${error.message} Code: ${error.code} Details: ${error.details}, Hint: ${error.hint}`
          );
        }
        setUser(session?.user);

        const { data: authListener } =
          supabase.auth.onAuthStateChange((event, session) => {
            switch (event) {
              case 'INITIAL_SESSION':
                setUser(session?.user);
                break;
              case 'SIGNED_IN':
                setUser(session?.user);
                break;
              case 'SIGNED_OUT':
                setUser(null);
                break;
              case 'TOKEN_REFRESHED':
                setUser(session?.user);
                break;
              default:
                break;
            }
          });

        if (authListener && authListener.subscription) {
          authSubscription = authListener.subscription;
        }
      } catch (err) {
        console.error(`Error getting session data: `, err);
      }
    };

    getCurrentSession();

    return () => {
      if (authSubscription) {
        authSubscription.unsubscribe();
        console.log('onAuthStateChange cleaned up.');
      }
    };
    
  }, []);

  const logIn = async () => {
    try {
      const { _data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      });
      if (error) {
        console.error(`AuthO error object: `, error);
        throw new Error(
          `Supabase AuthO) Error: ${error.message} (Code: ${error.code}) (Details: ${error.details}) (Hint: ${error.hint})`
        );
      }
    } catch (err) {
      console.error(`Error authenticating with third party: `, err);
    }
  };

  const logOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error(`Sign out error object: `, error);
        throw new Error(
          `Supabase AuthO) Error: ${error.message} (Code: ${error.code}) (Details: ${error.details}) (Hint: ${error.hint})`
        );
      }
      // User state updated by onAuthStateChange
    } catch (err) {
      console.error(`Error logging out: `, err);
    }
  };

  return (
    <>
      <Header logInFn={logIn} logOutFn={logOut} userState={user} />
      {user && (
        <>
          <h4 className={styles.authMsg}>
            Logged in as{' '}
            {user.email ? user.email.split('@')[0] : user.id}
          </h4>
          <Dashboard />
        </>
      ) }
    </>
  );
}

export default App;
