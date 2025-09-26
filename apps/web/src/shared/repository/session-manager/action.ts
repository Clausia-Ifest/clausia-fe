"use server";

import { getIronSession, type IronSession } from "iron-session";
import { cookies } from "next/headers";
import { decodeToken } from "@/shared/lib/auth/decode";
import {
  defaultSession,
  MAX_AGE,
  type SessionData,
  sessionOptions,
} from "@/shared/lib/auth/session";

async function _getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (session.expiresAt && session.expiresAt < Date.now()) {
    session.destroy();
  }

  if (!session.isLoggedIn) {
    session.id = defaultSession.id;
    session.email = defaultSession.email;
    session.full_name = defaultSession.full_name;
    session.access_token = defaultSession.access_token;
    session.role = defaultSession.role;
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}

export async function createSession(token: string) {
  const session = await _getSession();
  const decoded = decodeToken(token);
  session.isLoggedIn = true;
  session.access_token = token;
  session.role = decoded.user.role;
  session.id = decoded.user.id;
  session.email = decoded.user.email;
  session.full_name = decoded.user.full_name;
  session.expiresAt = Date.now() + MAX_AGE;

  await session.save();
}

export async function destroySession() {
  const session = await _getSession();
  session.destroy();
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const session = await _getSession();
  return JSON.parse(JSON.stringify(session));
}
