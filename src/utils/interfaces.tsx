export interface todoListItem {
    completed: boolean;
    created_at: string;
    doc_id: string;
    id: number;
    title: string;
    updated_at: string;
  }
  export interface AppliedFilter {
    all: boolean;
    active: boolean;
    done: boolean;
  }
  export interface todosLIst {
    items:todoListItem,
    loading: boolean,
    selectedItem: {
      userId: number,
      id: number,
      title: string,
      completed: boolean,
      doc_id:string,
    },
    showModel: boolean,
    showSortByModal: boolean,
    showFilterModal: boolean,
    appliedFilter: {
      all: boolean,
      active: boolean,
      done: boolean,
    },
    activeArray: [],
    doneArray: [],
    original: [],
    updateMostRecentArray: [],
    sortBy: {
      recent: boolean,
      ascendingOrder: boolean,
      descendingOrder: boolean,
    },
  }
