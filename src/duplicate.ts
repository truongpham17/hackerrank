const sample = [
  // parentId = null -> root
  {
    "id": "folder-id-1",
    "parentId": null
  },
  {
    "id": "sub-folder-id-1",
    "parentId": "folder-id-1"
  },
  {
    "id": "folder-id-2",
    "parentId": null
  },
  {
    "id": "sub-folder-id-2",
    "parentId": "folder-id-1"
  },
  {
    "id": "sub-of-sub-folder-id-1",
    "parentId": "sub-folder-id-1"
  }
]

type Item = {
  id: string,
  parentId: string
}

const getSubItems = (parentId: string): Item[] => {
  // return all the subfolders of the parentId
  return [];
}

const getItemById = (itemId: string): Item => {
  // return the item by id
  return {
    id: '',
    parentId: ''
  }
}

const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const saveItems = (items: Item[]) => {
  // save items
}


const deleteItems = (items: Item[]) => {

}

const duplicateFolder = (folderId: string) => {
  const newItems: {
    id: string,// new id
    parentId: string
  }[] = []

  const rootItem = getItemById(folderId); // id and parentId 
  const queue = new Queue();

  queue.add(rootItem)

  while (queue.size() > 0) {
    const item = queue.take();
    // get sub items
    const subItems = getSubItems(item.id) || []; // [A11, A12]
    // generate new id
    item.id = generateId();
    newItems.push(item);
    for (const subItem of subItems) {
      queue.add({
        ...subItem,
        parentId: item.id
      });
    }
  }

  // save new items
  try {
    saveItems(newItems);
  } catch (error) {
    // delete all 
    deleteItems(newItems);
  }
}


// optimized queue
class Queue {
  data: any[] = [];
  lastIndex = -1;
  firstIndex = 0;

  add(value) {
    this.lastIndex++;
    this.data[this.lastIndex] = value;
  }

  take() {
    if (this.firstIndex <= this.lastIndex) {
      const result = this.data[this.firstIndex];
      this.data[this.firstIndex] = undefined;
      this.firstIndex++;
      if (this.size() === 0) {
        this.firstIndex = 0;
        this.lastIndex = -1;
      }
      return result;
    } else {
      return undefined;
    }
  }

  size() {
    return this.lastIndex - this.firstIndex + 1;
  }

  clear() {
    this.data.length = 0;
    this.lastIndex = -1;
    this.firstIndex = 0;
  }
}