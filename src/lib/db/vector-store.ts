import { OpenAIEmbeddings } from "@langchain/openai";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { PoolConfig } from "pg";

const pgConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
};

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "text-embedding-3-small",
});

export const VectorStoreService = {
  /**
   * Initialize or get the vector store instance
   */
  async getStore() {
    return await PGVectorStore.initialize(embeddings, {
      postgresConnectionOptions: pgConfig,
      tableName: "legal_embeddings",
      columns: {
        idColumnName: "id",
        vectorColumnName: "embedding",
        contentColumnName: "content",
        metadataColumnName: "metadata",
      },
    });
  },

  /**
   * Search for similar legal clauses or precedents
   */
  async searchSimilar(query: string, limit: number = 5) {
    const store = await this.getStore();
    return await (store as any).similaritySearch(query, limit);
  },

  /**
   * Add a new document to the vector store
   */
  async addDocument(content: string, metadata: Record<string, any>) {
    const store = await this.getStore();
    await store.addDocuments([{ pageContent: content, metadata }]);
  }
};
