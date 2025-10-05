/**
 * Generates a cryptographically secure unique identifier.
 *
 * @returns A RFC 4122 v4 compliant UUID string in the format:
 *          `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`
 *
 * @remarks
 * Uses the native Web Crypto API's `randomUUID()` method for secure random
 * value generation. This method is suitable for security-sensitive operations
 * such as generating session tokens, entity identifiers, or API keys.
 *
 * **Runtime Requirements:**
 * - Node.js 16.7.0+ or modern browsers (Chrome 92+, Firefox 95+, Safari 15.4+)
 * - ES2022 baseline with Web Crypto API support
 *
 * **Security Considerations:**
 * - Cryptographically secure (CSPRNG-based)
 * - Collision probability is effectively zero for practical purposes
 * - Suitable for distributed systems without coordination
 *
 * @example
 * ```typescript
 * const activityId = generateId();
 * // => "550e8400-e29b-41d4-a716-446655440000"
 *
 * const activity: Activity = {
 *   id: generateId(),
 *   name: "Morning Exercise",
 *   createdAt: new Date(),
 *   // ...
 * };
 * ```
 *
 * @throws {TypeError} If crypto.randomUUID is not available in the environment.
 */
export const generateId = (): string => {
  return crypto.randomUUID();
};
