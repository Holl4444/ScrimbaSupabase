import styles from './Header.module.css';

function Header({ logInFn, logOutFn, userState }) {

  return (

      <header>
        <div className={styles.header}>
          <h1>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '8px' }}
            >
              <path
                d="M12 2v8M12 14v8M4.93 4.93l5.66 5.66M13.41 13.41l5.66 5.66M2 12h8M14 12h8M4.93 19.07l5.66-5.66M13.41 10.59l5.66-5.66"
                stroke="#29d952"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            Sesame Street Sales
          </h1>
          {userState !== null ? (
            <button onClick={logOutFn}>Log Out</button>
          ) : (
            <button onClick={logInFn}>Log In</button>
          )}
        </div>
      </header>
  );
}

export default Header;
