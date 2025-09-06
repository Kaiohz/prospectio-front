/**
 * Interface representing the response from token API
 */
export interface TokenResponse {
    /**
     * The authentication JWT token
     */
    token: string;

    /**
     * The session identifier
     */
    session_id: string;
}
