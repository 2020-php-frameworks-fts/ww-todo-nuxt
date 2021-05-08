<template>
  <v-flex>
    <v-row>
      <v-col lg="6" sm="12">
        <v-card>
          <v-card-title>
            Tasks to do
          </v-card-title>
          <v-card-subtitle v-if="!undoneTodos.length">
            Empty list
          </v-card-subtitle>
          <v-divider/>
          <v-list>
            <v-list-item v-for="task in undoneTodos" :key="task" class="list-item">
              <v-list-item-content>
                <v-list-item-title>
                  {{ task }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action class="list-action">
                <v-btn icon @click="(e) => changeTaskState(task, 'undone', 'done')">
                  <v-icon color="grey lighten-1">mdi-menu-right</v-icon>
                </v-btn>
                <v-btn icon @click="(e) => removeTask(task, 'undone')">
                  <v-icon color="grey lighten-1">mdi-close-thick</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col lg="6" sm="12">
        <v-card>
          <v-card-title>
            Done Tasks
          </v-card-title>
          <v-card-subtitle v-if="!doneTodos.length">
            Empty list
          </v-card-subtitle>
          <v-divider/>
          <v-list>
            <v-list-item v-for="task in doneTodos" :key="task" class="list-item">
              <v-list-item-content>
                <v-list-item-title>
                  {{ task }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action class="list-action">
                <v-btn icon @click="(e) => changeTaskState(task, 'done', 'undone')">
                  <v-icon color="grey lighten-1">mdi-menu-left</v-icon>
                </v-btn>
                <v-btn icon @click="(e) => removeTask(task, 'done')">
                  <v-icon color="grey lighten-1">mdi-close-thick</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row style="justify-content: center; margin-bottom: 15px;">
      <v-card>
        <v-card-title>
          New task
        </v-card-title>
        <v-form class="new-task-form">
          <v-text-field dark v-model="inputData"/>
          <span>{{ error }}</span>
          <v-btn
            :loading="isLoading"
            plain
            @click="addNewTask"
          >
            Submit
          </v-btn>
        </v-form>
      </v-card>
    </v-row>
  </v-flex>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: '',
  data: () => ({
    taskmock: {
      undone: [
      ],
      done: [
      ]
    },
    inputData: ''
  }),
  async fetch () {
    await this.getTodos(this.user_id)
  },
  computed: {
    ...mapGetters('tasks', ['doneTodos', 'undoneTodos', 'isLoading', 'error']),
    ...mapGetters('session', ['user_id'])
  },
  methods: {
    ...mapActions('tasks', ['createTodo', 'getTodos', 'setTodoState', 'deleteTodo']),
    async addNewTask () {
      if (this.inputData.length === 0) {
        return
      }
      const res = await this.createTodo({
        name: this.inputData,
        user_id: this.user_id
      })
      if (res) {
        await this.getTodos(this.user_id)
      }
      this.inputData = ''
    },
    async removeTask (taskName, collection) {
      await this.deleteTodo({
        name: taskName,
        user_id: this.user_id
      })
    },
    async changeTaskState (taskName, collection, collectionTo) {
      const newTaskState = {
        user_id: this.user_id,
        name: taskName,
        state: collectionTo === 'undone'
      }
      await this.setTodoState(newTaskState)
    }
  }
}
</script>

<style scoped>
  .new-task-form {
    padding: 15px 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
  }
  .list-item {
    padding: 0 40px;
  }
  .list-action {
    display: flex;
    flex-direction: row;
  }
</style>
