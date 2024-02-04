import { useStore } from "@nanostores/react";
import { useState, type FormEvent } from "react";
import { sharedBackend } from "../../stores/sharedBackend";
import { sharedExperiences } from "../../stores/sharedExperiences";
import { TextInput } from "../common/TextInput";
import { DateInput } from "../common/DateInput";
import moment from "moment";

export function EditExperience(props: { resumeId: string }) {
  const [error, setError] = useState("");

  const experiences = useStore(sharedExperiences.store);
  if (!experiences.length) return null;
  const experience = experiences[0];

  function redirectToExperiences() {
    window.location.href = `/resumes/${props.resumeId}/experiences`;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sharedBackend()
      .updateExperience(experience)
      .catch((err) => {
        setError(err.message ?? "Error");
        throw err;
      });
    redirectToExperiences();
  }

  async function cancel() {
    redirectToExperiences();
  }

  async function deleteExperience() {
    await sharedBackend().deleteExperience(experience.id);
    redirectToExperiences();
  }

  return (
    <form className="w-80 form-card" onSubmit={(e) => submit(e)}>
      <TextInput
        label="Title"
        name="title"
        value={experience.title}
        required
        placeholder="Title"
        onInput={(value) =>
          sharedExperiences.update(experience.id, { title: value })
        }
      />
      <TextInput
        label="Company"
        name="company"
        value={experience.company}
        required
        placeholder="Company"
        onInput={(value) =>
          sharedExperiences.update(experience.id, { company: value })
        }
      />
      <TextInput
        label="Description"
        name="description"
        value={experience.description}
        placeholder="Description"
        area
        onInput={(value) =>
          sharedExperiences.update(experience.id, { description: value })
        }
      />
      <DateInput
        label="Start date"
        name="startDate"
        value={experience.startDate}
        onInput={(value) =>
          sharedExperiences.update(experience.id, { startDate: value })
        }
      />
      <DateInput
        label="End date"
        name="endDate"
        value={experience.endDate}
        onInput={(value) =>
          sharedExperiences.update(experience.id, { endDate: value })
        }
      />

      <div className="flex flex-col items-center space-y-2 mt-4">
        <button className="btn btn-primary btn-wide" type="submit">
          Save
        </button>
        <button className="btn btn-ghost btn-wide" onClick={() => cancel()}>
          Cancel
        </button>
        <button
          className="btn btn-ghost btn-wide"
          onClick={() => deleteExperience()}
        >
          Delete
        </button>
      </div>
    </form>
  );
}
