import { AdapterLocalStorage } from "./adapter-async-storage";
import { Repository } from "./repository";

jest.mock("./adapter-async-storage");

describe("Repository", () => {
  let repository: Repository;
  let mockAdapter: jest.Mocked<AdapterLocalStorage>;

  beforeEach(() => {
    mockAdapter = new AdapterLocalStorage() as jest.Mocked<AdapterLocalStorage>;
    repository = new Repository("@group-value-key-test", mockAdapter);
  });

  it("should list groups", async () => {
    const mockData = JSON.stringify([
      { id: "1", name: "Test Group", users: [] },
    ]);
    mockAdapter.get.mockResolvedValueOnce(mockData);

    const groups = await repository.listGroups();

    expect(groups).toEqual([{ id: "1", name: "Test Group", users: [] }]);
  });

  it("should create a new group", async () => {
    mockAdapter.get.mockResolvedValueOnce(JSON.stringify([]));
    const response = await repository.createNewGroup("Test Group");

    expect(response).toEqual({
      errors: [],
      messages: ["Group created successfully"],
    });
  });

  it("should not create a group if it already exists", async () => {
    const existingGroup = [{ id: "1", name: "Test Group", users: [] }];
    mockAdapter.get.mockResolvedValueOnce(JSON.stringify(existingGroup));

    const response = await repository.createNewGroup("test Group");

    expect(response).toEqual({
      errors: ["Group already exists"],
      messages: [],
    });
  });

  it("should remove a group", async () => {
    const groups = [{ id: "1", name: "Test Group", users: [] }];
    mockAdapter.get.mockResolvedValueOnce(JSON.stringify(groups));

    const response = await repository.removeGroup("1");

    expect(response).toEqual({
      errors: [],
      messages: ["Group removed successfully"],
    });
  });

  it("should not remove a group if it does not exist", async () => {
    const groups = [{ id: "1", name: "Test Group", users: [] }];
    mockAdapter.get.mockResolvedValueOnce(JSON.stringify(groups));

    const response = await repository.removeGroup("2");

    expect(response).toEqual({ errors: ["Group not exists"], messages: [] });
  });
});
