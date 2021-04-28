<template>
  <v-flex>
    <v-row>
      <v-col lg="6" sm="12">
        <v-card>
          <v-card-title>
            Tasks to do
          </v-card-title>
          <v-card-subtitle v-if="!taskmock.undone.length">
            Empty list
          </v-card-subtitle>
          <v-divider/>
          <v-list>
            <v-list-item v-for="task in taskmock.undone" :key="task" class="list-item">
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
          <v-card-subtitle v-if="!taskmock.done.length">
            Empty list
          </v-card-subtitle>
          <v-divider/>
          <v-list>
            <v-list-item v-for="task in taskmock.done" :key="task" class="list-item">
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
          <v-btn
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
export default {
  name: '',
  data: () => ({
    taskmock: {
      undone: [
        'Jeden',
        'dwa',
        'trzy',
        'cztery',
        'piec',
        'szesc'
      ],
      done: [
        'Jeden1',
        'dwa2',
        'trzy3',
        'cztery4',
        'piec5',
        'szesc6'
      ]
    },
    inputData: ''
  }),
  methods: {
    addNewTask () {
      if (this.inputData.length === 0) {
        return
      }
      this.taskmock.undone.push(this.inputData)
      this.inputData = ''
    },
    removeTask (taskName, collection) {
      const index = this.taskmock[collection].findIndex(task => task === taskName)
      this.taskmock[collection].splice(index, 1)
    },
    changeTaskState (taskName, collection, collectionTo) {
      this.taskmock[collectionTo].push(taskName)
      this.removeTask(taskName, collection)
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
