import { drizzle } from "drizzle-orm/postgres-js";
import { eq, sql } from "drizzle-orm";
import messagesTable from "../../../db/schema/messages";
import { HTTPException } from "hono/http-exception";
import db from "../../../db";

export async function getMessages() {
  try {
    const result = await db.select().from(messagesTable);
    console.log(result);
    return result;
  } catch (e: unknown) {
    console.log(`Error retrieving messages: ${e}`);
    return "suck";
  }
}

export async function getMessage(id: number) {
  try {
    const message = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.id, id));

    if (!message) {
      console.log("Message not Found");
      throw new HTTPException(401, { message: "Message not found" });
    }

    return message;
  } catch (e: unknown) {
    console.log(`Error retrieving message by id: ${e}`);
  }
}

export async function updateMessage(id: number, options: { body: string }) {
  try {
    const { body } = options;

    return await db
      .update(messagesTable)
      .set({
        ...(body ? { body } : {}),
        updatedAt: sql`NOW()`,
      })
      .where(eq(messagesTable.id, id))
      .returning({
        id: messagesTable.id,
        body: messagesTable.body,
      });
  } catch (e: unknown) {
    console.log(`Error updating message: ${e}`);
  }
}

export async function createMessage(options: { body: string }) {
  try {
    const { body } = options;

    return await db.insert(messagesTable).values({
      body: body,
    });
  } catch (e: unknown) {
    console.log(`Error creating message: ${e}`);
  }
}

export async function deleteMessage(options: { id: number }) {
  try {
    const { id } = options;
    return await db.delete(messagesTable).where(eq(messagesTable.id, id));
  } catch (e: unknown) {
    console.log(`Error deleting message: ${e}`);
  }
}
