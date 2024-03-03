from typing import List
from collections import defaultdict
class Solution:
    def countPairsOfConnectableServers(self, edges: List[List[int]], signalSpeed: int) -> List[int]:
        graph = defaultdict(list)
        distances = defaultdict(int)

        # create graph store node 1_2
        for edge in edges:
            [node_1, node_2, val] = edge
            graph[node_1].append(node_2)
            graph[node_2].append(node_1)
            distances[f"{node_1}#{node_2}"] = val
            distances[f"{node_2}#{node_1}"] = val
        #middle server node1#node2 = arr
        middle_servers = defaultdict(list)
        check = set()

        def build_adjacency_list(edges):
            adjacency_list = defaultdict(list)
            for node1, node2, value in edges:
                adjacency_list[node1].append((node2, value))
                adjacency_list[node2].append((node1, value))  # For undirected graph
            return adjacency_list

        def dfs(node, parent, adjacency_list, distance_dict, distance):
            for neighbor, edge_distance in adjacency_list[node]:
                if neighbor != parent:
                    distance_dict[node, neighbor] = distance + edge_distance
                    dfs(neighbor, node, adjacency_list, distance_dict, distance + edge_distance)

        def calculate_distances(edges):
            adjacency_list = build_adjacency_list(edges)
            distance_dict = {}
            for node in adjacency_list:
                dfs(node, None, adjacency_list, distance_dict, 0)
            return distance_dict
        distance_nodes = calculate_distances(edges)

        def tree_travel(cur_node, travel_arr):
            if(cur_node in check):
                return
            check.add(cur_node)
            #travel all connect node with cur_node
            for connect_node in graph[cur_node]:
                if(connect_node in check):
                    continue
                # add this node to travel path
                travel_arr.append(connect_node)
                # get current travel path
                n = len(travel_arr)
                # val = distances[f"{cur_node}#{connect_node}"]
                # new_distance = prev_distance + val
                # from first node, to the node n-3, add middle from i+1 to n-2 to middle server i and n-1
                # n-1 is connect_node
                for i in range(0, len(travel_arr) - 2):
                    middle_servers[f"{travel_arr[i]}#{connect_node}"].extend(travel_arr[i+1:n-1])
                    middle_servers[f"{connect_node}#{travel_arr[i]}"].extend(travel_arr[i+1:n-1])
                    # distance_nodes[f"{travel_arr[i]}#{connect_node}"] = new_distance
                    # distance_nodes[f"{connect_node}#{travel_arr[i]}"] = new_distance
                    # deduct distance travel[i], travel[i+1]
                    # new_distance -= distances[f"{travel_arr[i]}#{travel_arr[i+1]}"]
                tree_travel(connect_node, travel_arr)
                travel_arr.pop()
        for i in range(len(edges) + 1):
            if len(graph[i]) == 1:
                tree_travel(i,[i])
                break
        print(distance_nodes)
        def get_distance(distance_dict, node1, node2):
            key1 = (node1, node2)
            key2 = (node2, node1)
            if key1 in distance_dict:
                return distance_dict[key1]
            elif key2 in distance_dict:
                return distance_dict[key2]
            else:
                return None

        
        result = []
        for i in range(len(edges) + 1):
            result.append(0)
        for key in middle_servers:
            [node1, node2] = key.split("#")
            if(node2 > node1):
                continue
            for middle in middle_servers[key]:
                print(get_distance(distance_nodes, middle, node2))
                if get_distance(distance_nodes, middle, node2) % signalSpeed == 0 and get_distance(distance_nodes, node1, middle) % signalSpeed == 0:
                    result[middle] += 1
        return result

a = Solution()
print(a.countPairsOfConnectableServers([[0,6,3],[6,5,3],[0,3,1],[3,2,7],[3,1,6],[3,4,2]],3))




