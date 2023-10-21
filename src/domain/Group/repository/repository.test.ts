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

  describe("listGroups", () => {
    it("should list groups", async () => {
      const mockData = JSON.stringify([
        { id: "1", name: "Test Group", users: [] },
      ]);
      mockAdapter.get.mockResolvedValueOnce(mockData);

      const groups = await repository.listGroups();

      expect(groups).toEqual([{ id: "1", name: "Test Group", users: [] }]);
    });
  });

  describe("createNewGroup", () => {
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
  });

  describe("removeGroup", () => {
    it("should not remove a group if id is not provided id", async () => {
      const groups = [{ id: "1", name: "Test Group", users: [] }];
      mockAdapter.get.mockResolvedValueOnce(JSON.stringify(groups));

      const response = await repository.removeGroup("");

      expect(response).toEqual({
        errors: ["Group id is required"],
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

  describe("addUserToGroup", () => {
    it("should not add a user if group id is not provided", async () => {
      const groups = [{ id: "1", name: "Test Group", users: [] }];
      mockAdapter.get.mockResolvedValueOnce(JSON.stringify(groups));

      const response = await repository.addNewUserToGroup(
        "",
        "User Name",
        "Team Name"
      );

      expect(response).toEqual({
        errors: ["Group id is required"],
        messages: [],
      });
    });

    it("should not add a user if user name is not provided", async () => {
      const groups = [{ id: "1", name: "Test Group", users: [] }];
      mockAdapter.get.mockResolvedValueOnce(JSON.stringify(groups));

      const response = await repository.addNewUserToGroup("1", "", "Team Name");

      expect(response).toEqual({
        errors: ["User name is required"],
        messages: [],
      });
    });

    it("should not add a user if group does not exist", async () => {
      const groups = [{ id: "1", name: "Test Group", users: [] }];
      mockAdapter.get.mockResolvedValueOnce(JSON.stringify(groups));

      const response = await repository.addNewUserToGroup(
        "2",
        "User Name",
        "Team Name"
      );

      expect(response).toEqual({ errors: ["Group not exists"], messages: [] });
    });

    it("should add a user to a group", async () => {
      const groups = [
        { id: "1", name: "Test Group", users: [] },
        { id: "2", name: "Test Group 2", users: [] },
      ];
      mockAdapter.get.mockResolvedValueOnce(JSON.stringify(groups));

      const response = await repository.addNewUserToGroup(
        "1",
        "User Name",
        "Team Name"
      );

      expect(response).toEqual({
        errors: [],
        messages: ["User added successfully"],
      });
    });
  });
});
